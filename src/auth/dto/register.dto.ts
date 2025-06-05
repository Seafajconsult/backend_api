import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsOptional, IsDateString, Matches, MinLength, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../../prisma/types';
import { PATTERNS } from '../../config/constants';

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @Matches(PATTERNS.PASSWORD, {
    message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
  })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.STUDENT })
  @IsEnum(UserRole)
  role: UserRole;
}

export class StudentRegisterDto extends RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '1995-01-01' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: 'Nigerian' })
  @IsString()
  nationality: string;

  @ApiProperty({ example: '+2348012345678', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: '123 Main Street, Lagos, Nigeria', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Bachelor of Science in Computer Science', required: false })
  @IsOptional()
  @IsString()
  currentEducation?: string;

  @ApiProperty({ example: 'REF123456', required: false })
  @IsOptional()
  @IsString()
  referredBy?: string;
}

export class EmployerRegisterDto extends RegisterDto {
  @ApiProperty({ example: 'Tech Solutions Ltd' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'RC123456' })
  @IsString()
  registrationNumber: string;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  companySize?: number;

  @ApiProperty({ example: 'Technology', required: false })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ example: 'https://techsolutions.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: '456 Business District, Lagos, Nigeria' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+2348012345678' })
  @IsPhoneNumber()
  phone: string;
}

export class AdminRegisterDto extends RegisterDto {
  @ApiProperty({ example: 'Jane' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Student Management' })
  @IsString()
  department: string;

  @ApiProperty({ example: 'student_management' })
  @IsString()
  assignedRole: string;
}
