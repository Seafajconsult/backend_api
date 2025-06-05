export declare enum UserRole {
    STUDENT = "STUDENT",
    EMPLOYER = "EMPLOYER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
export declare enum UserStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    INACTIVE = "INACTIVE"
}
export declare enum ApplicationStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export declare enum VisaStatus {
    NOT_STARTED = "NOT_STARTED",
    DOCUMENTS_SUBMITTED = "DOCUMENTS_SUBMITTED",
    APPOINTMENT_SCHEDULED = "APPOINTMENT_SCHEDULED",
    INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
    VISA_GRANTED = "VISA_GRANTED",
    VISA_REJECTED = "VISA_REJECTED"
}
export interface User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    student?: Student | null;
    employer?: Employer | null;
    admin?: Admin | null;
    superAdmin?: SuperAdmin | null;
}
export type Student = {
    id: string;
    userId: string;
    applicationId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    nationality: string;
    phone?: string | null;
    address?: string | null;
    currentEducation?: string | null;
    referralCode?: string | null;
    referredBy?: string | null;
    user: User;
    documents: any[];
    applications: any[];
    visaApplications: any[];
    payments: any[];
    testimonial?: any | null;
    universityOffers: any[];
};
export type Employer = {
    id: string;
    userId: string;
    companyName: string;
    registrationNumber: string;
    companySize?: number | null;
    industry?: string | null;
    website?: string | null;
    address: string;
    phone: string;
    verificationDoc?: string | null;
    user: User;
    recruitmentRequests: any[];
    jobPostings: any[];
    payments: any[];
};
export type Admin = {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    department: string;
    assignedRole: string;
    user: User;
};
export type SuperAdmin = {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    user: User;
};
export type UserWithProfile = User & {
    student?: Student;
    employer?: Employer;
    admin?: Admin;
    superAdmin?: SuperAdmin;
};
export type UserWithProfileType = User & {
    student?: Student | null;
    employer?: Employer | null;
    admin?: Admin | null;
    superAdmin?: SuperAdmin | null;
};
export declare const isStudent: (user: UserWithProfileType) => user is UserWithProfileType & {
    student: Student;
};
export declare const isEmployer: (user: UserWithProfileType) => user is UserWithProfileType & {
    employer: Employer;
};
export declare const isAdmin: (user: UserWithProfileType) => user is UserWithProfileType & {
    admin: Admin;
};
export declare const isSuperAdmin: (user: UserWithProfileType) => user is UserWithProfileType & {
    superAdmin: SuperAdmin;
};
