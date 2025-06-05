import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'student_123_admin' })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ example: 'Hello, I need help with my application.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}

export class JoinRoomDto {
  @ApiProperty({ example: 'student_123_admin' })
  @IsString()
  @IsNotEmpty()
  roomId: string;
}

export class CreateRoomDto {
  @ApiProperty({ example: 'Support Chat' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'support', required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: ['user1', 'user2'], required: false })
  @IsOptional()
  participants?: string[];
}
