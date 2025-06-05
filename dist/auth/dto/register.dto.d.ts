import { UserRole } from '../../prisma/types';
export declare class RegisterDto {
    email: string;
    password: string;
    role: UserRole;
}
export declare class StudentRegisterDto extends RegisterDto {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    phone?: string;
    address?: string;
    currentEducation?: string;
    referredBy?: string;
}
export declare class EmployerRegisterDto extends RegisterDto {
    companyName: string;
    registrationNumber: string;
    companySize?: number;
    industry?: string;
    website?: string;
    address: string;
    phone: string;
}
export declare class AdminRegisterDto extends RegisterDto {
    firstName: string;
    lastName: string;
    department: string;
    assignedRole: string;
}
