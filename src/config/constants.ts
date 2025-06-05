export const JWT = {
  ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
};

export const COOKIE = {
  SECRET: process.env.COOKIE_SECRET,
  OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  },
};

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB in bytes
  ALLOWED_FILE_TYPES: (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,pdf,doc,docx').split(','),
  DOCUMENT_TYPES: {
    PASSPORT: 'passport',
    TRANSCRIPT: 'transcript',
    ENGLISH_SCORE: 'english_score',
    OFFER_LETTER: 'offer_letter',
    VISA_DOCUMENT: 'visa_document',
    VERIFICATION_DOC: 'verification_doc',
    TESTIMONIAL_VIDEO: 'testimonial_video',
  },
};

export const BREVO = {
  API_KEY: process.env.BREVO_API_KEY,
  SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL || 'noreply@sea-faj.com',
  SENDER_NAME: process.env.BREVO_SENDER_NAME || 'SEA-FAJ Consult',
  TEMPLATES: {
    EMAIL_VERIFICATION: parseInt(process.env.EMAIL_VERIFICATION_TEMPLATE_ID || '1') || 1,
    PASSWORD_RESET: parseInt(process.env.PASSWORD_RESET_TEMPLATE_ID || '2') || 2,
    WELCOME: parseInt(process.env.WELCOME_TEMPLATE_ID || '3') || 3,
    APPLICATION_STATUS: parseInt(process.env.APPLICATION_STATUS_TEMPLATE_ID || '4') || 4,
    PAYMENT_CONFIRMATION: parseInt(process.env.PAYMENT_CONFIRMATION_TEMPLATE_ID || '5') || 5,
  },
};

export const PAYSTACK = {
  SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
  WEBHOOK_SECRET: process.env.PAYSTACK_WEBHOOK_SECRET,
  BASE_URL: 'https://api.paystack.co',
};

export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
  FOLDERS: {
    DOCUMENTS: 'sea-faj/documents',
    PROFILES: 'sea-faj/profiles',
    TESTIMONIALS: 'sea-faj/testimonials',
    VERIFICATION: 'sea-faj/verification',
  },
};

export const APP = {
  PORT: parseInt(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3001',
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3001',
};

export const RATE_LIMIT = {
  TTL: parseInt(process.env.THROTTLE_TTL || '60'),
  LIMIT: parseInt(process.env.THROTTLE_LIMIT || '10'),
};

export const OTP = {
  EXPIRY_MINUTES: parseInt(process.env.OTP_EXPIRY_MINUTES || '10'),
  LENGTH: parseInt(process.env.OTP_LENGTH || '6'),
};

export const FRONTEND_URLS = {
  BASE: process.env.FRONTEND_URL || 'http://localhost:3001',
  STUDENT_PORTAL: process.env.STUDENT_PORTAL_URL || 'http://localhost:3001/student',
  EMPLOYER_PORTAL: process.env.EMPLOYER_PORTAL_URL || 'http://localhost:3001/employer',
  ADMIN_PORTAL: process.env.ADMIN_PORTAL_URL || 'http://localhost:3001/admin',
};

export const SUPER_ADMIN_DEFAULTS = {
  EMAIL: process.env.SUPER_ADMIN_EMAIL || 'admin@sea-faj.com',
  PASSWORD: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!',
  FIRST_NAME: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
  LAST_NAME: process.env.SUPER_ADMIN_LAST_NAME || 'Admin',
};

// Common regex patterns
export const PATTERNS = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  APPLICATION_ID: /^SEA-\d{6}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
