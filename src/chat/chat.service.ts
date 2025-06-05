import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../prisma/types';

export interface CreateMessageDto {
  content: string;
  senderId: string;
  roomId: string;
}

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Verify socket JWT token
   */
  async verifySocketToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
        },
      });

      if (!user || user.status !== 'ACTIVE') {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verify if user has access to a chat room
   */
  async verifyRoomAccess(userId: string, roomId: string): Promise<boolean> {
    // Room ID format: "student_{studentId}_admin" or "employer_{employerId}_admin"
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        employer: true,
        admin: true,
        superAdmin: true,
      },
    });

    if (!user) return false;

    // Admins and Super Admins can access any room
    if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    // Students can only access their own room
    if (user.role === UserRole.STUDENT && user.student) {
      return roomId === `student_${user.student.id}_admin`;
    }

    // Employers can only access their own room
    if (user.role === UserRole.EMPLOYER && user.employer) {
      return roomId === `employer_${user.employer.id}_admin`;
    }

    return false;
  }

  /**
   * Create a new message
   */
  async createMessage(createMessageDto: CreateMessageDto) {
    return this.prisma.chatMessage.create({
      data: createMessageDto,
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  /**
   * Get messages for a room
   */
  async getRoomMessages(roomId: string, limit: number = 50) {
    return this.prisma.chatMessage.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  /**
   * Get chat rooms for a user
   */
  async getUserChatRooms(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        employer: true,
        admin: true,
        superAdmin: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    let rooms = [];

    if (user.role === UserRole.STUDENT && user.student) {
      rooms.push({
        id: `student_${user.student.id}_admin`,
        name: 'Support Chat',
        type: 'support',
        participants: ['student', 'admin'],
      });
    }

    if (user.role === UserRole.EMPLOYER && user.employer) {
      rooms.push({
        id: `employer_${user.employer.id}_admin`,
        name: 'Recruitment Support',
        type: 'support',
        participants: ['employer', 'admin'],
      });
    }

    if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) {
      // Get all active students and employers for admin
      const students = await this.prisma.student.findMany({
        where: {
          user: {
            status: 'ACTIVE',
          },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      const employers = await this.prisma.employer.findMany({
        where: {
          user: {
            status: 'ACTIVE',
          },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      // Add student rooms
      students.forEach(student => {
        rooms.push({
          id: `student_${student.id}_admin`,
          name: `${student.firstName} ${student.lastName}`,
          type: 'student_support',
          participants: ['student', 'admin'],
          userEmail: student.user.email,
        });
      });

      // Add employer rooms
      employers.forEach(employer => {
        rooms.push({
          id: `employer_${employer.id}_admin`,
          name: employer.companyName,
          type: 'employer_support',
          participants: ['employer', 'admin'],
          userEmail: employer.user.email,
        });
      });
    }

    return rooms;
  }

  /**
   * Get chat room details
   */
  async getChatRoomDetails(roomId: string, userId: string) {
    const hasAccess = await this.verifyRoomAccess(userId, roomId);

    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this chat room');
    }

    const messages = await this.getRoomMessages(roomId, 100);

    // Parse room ID to get room info
    let roomInfo = { name: 'Chat Room', type: 'general' };

    if (roomId.startsWith('student_')) {
      const studentId = roomId.split('_')[1];
      const student = await this.prisma.student.findUnique({
        where: { id: studentId },
        select: {
          firstName: true,
          lastName: true,
          user: {
            select: { email: true },
          },
        },
      });

      if (student) {
        roomInfo = {
          name: `${student.firstName} ${student.lastName}`,
          type: 'student_support',
        };
      }
    } else if (roomId.startsWith('employer_')) {
      const employerId = roomId.split('_')[1];
      const employer = await this.prisma.employer.findUnique({
        where: { id: employerId },
        select: {
          companyName: true,
          user: {
            select: { email: true },
          },
        },
      });

      if (employer) {
        roomInfo = {
          name: employer.companyName,
          type: 'employer_support',
        };
      }
    }

    return {
      roomId,
      ...roomInfo,
      messages: messages.reverse(), // Reverse to show oldest first
    };
  }

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(roomId: string, userId: string) {
    const hasAccess = await this.verifyRoomAccess(userId, roomId);

    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this chat room');
    }

    // This would typically update a read status in the database
    // For now, we'll just return success
    return { success: true, message: 'Messages marked as read' };
  }
}
