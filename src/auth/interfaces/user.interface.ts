import { UserRole, UserStatus } from '../../prisma/types';

export interface IUser {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface IStudent {
  id: string;
  userId: string;
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

export interface IEmployer {
  id: string;
  userId: string;
  companyName: string;
  registrationNumber: string;
  companySize?: number;
  industry?: string;
  website?: string;
  address: string;
  phone: string;
  verificationDoc?: string;
}

export interface IAdmin {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  department: string;
  assignedRole: string;
}

export interface ISuperAdmin {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
}

export interface IUserWithProfile extends IUser {
  student?: IStudent;
  employer?: IEmployer;
  admin?: IAdmin;
  superAdmin?: ISuperAdmin;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile?: IStudent | IEmployer | IAdmin | ISuperAdmin;
}

// Type guards
export const isStudent = (user: AuthUser): user is AuthUser & { profile: IStudent } => {
  return user.role === UserRole.STUDENT && !!user.profile;
};

export const isEmployer = (user: AuthUser): user is AuthUser & { profile: IEmployer } => {
  return user.role === UserRole.EMPLOYER && !!user.profile;
};

export const isAdmin = (user: AuthUser): user is AuthUser & { profile: IAdmin } => {
  return user.role === UserRole.ADMIN && !!user.profile;
};

export const isSuperAdmin = (user: AuthUser): user is AuthUser & { profile: ISuperAdmin } => {
  return user.role === UserRole.SUPER_ADMIN && !!user.profile;
};
