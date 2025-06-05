import { UserRole, UserStatus } from '../../prisma/types';
export declare class UserProfileDto {
    id: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    profile: any;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserProfileDto;
}
export declare class StudentProfileDto {
    id: string;
    applicationId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    nationality: string;
    phone?: string;
    address?: string;
    currentEducation?: string;
    referralCode?: string;
    referredBy?: string;
}
export declare class EmployerProfileDto {
    id: string;
    companyName: string;
    registrationNumber: string;
    companySize?: number;
    industry?: string;
    website?: string;
    address: string;
    phone: string;
    verificationDoc?: string;
}
export declare class AdminProfileDto {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    assignedRole: string;
}
export declare class MessageResponseDto {
    message: string;
    data?: any;
}
