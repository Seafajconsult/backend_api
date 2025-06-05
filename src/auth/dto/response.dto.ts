import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../prisma/types';

export class UserProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty()
  profile: any; // Will be typed based on role
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: UserProfileDto;
}

export class StudentProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  applicationId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  nationality: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  currentEducation?: string;

  @ApiProperty({ required: false })
  referralCode?: string;

  @ApiProperty({ required: false })
  referredBy?: string;
}

export class EmployerProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  registrationNumber: string;

  @ApiProperty({ required: false })
  companySize?: number;

  @ApiProperty({ required: false })
  industry?: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ required: false })
  verificationDoc?: string;
}

export class AdminProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  assignedRole: string;
}

export class MessageResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: any;
}
