export declare const JWT: {
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    ACCESS_TOKEN_SECRET: string | undefined;
    REFRESH_TOKEN_SECRET: string | undefined;
};
export declare const COOKIE: {
    SECRET: string | undefined;
    OPTIONS: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "strict";
        path: string;
    };
};
export declare const FILE_UPLOAD: {
    MAX_FILE_SIZE: number;
    ALLOWED_FILE_TYPES: string[];
    DOCUMENT_TYPES: {
        PASSPORT: string;
        TRANSCRIPT: string;
        ENGLISH_SCORE: string;
        OFFER_LETTER: string;
        VISA_DOCUMENT: string;
        VERIFICATION_DOC: string;
        TESTIMONIAL_VIDEO: string;
    };
};
export declare const BREVO: {
    API_KEY: string | undefined;
    SENDER_EMAIL: string;
    SENDER_NAME: string;
    TEMPLATES: {
        EMAIL_VERIFICATION: number;
        PASSWORD_RESET: number;
        WELCOME: number;
        APPLICATION_STATUS: number;
        PAYMENT_CONFIRMATION: number;
    };
};
export declare const PAYSTACK: {
    SECRET_KEY: string | undefined;
    PUBLIC_KEY: string | undefined;
    WEBHOOK_SECRET: string | undefined;
    BASE_URL: string;
};
export declare const CLOUDINARY: {
    CLOUD_NAME: string | undefined;
    API_KEY: string | undefined;
    API_SECRET: string | undefined;
    FOLDERS: {
        DOCUMENTS: string;
        PROFILES: string;
        TESTIMONIALS: string;
        VERIFICATION: string;
    };
};
export declare const APP: {
    PORT: number;
    NODE_ENV: string;
    FRONTEND_URL: string;
    BACKEND_URL: string;
    CORS_ORIGIN: string;
};
export declare const RATE_LIMIT: {
    TTL: number;
    LIMIT: number;
};
export declare const OTP: {
    EXPIRY_MINUTES: number;
    LENGTH: number;
};
export declare const FRONTEND_URLS: {
    BASE: string;
    STUDENT_PORTAL: string;
    EMPLOYER_PORTAL: string;
    ADMIN_PORTAL: string;
};
export declare const SUPER_ADMIN_DEFAULTS: {
    EMAIL: string;
    PASSWORD: string;
    FIRST_NAME: string;
    LAST_NAME: string;
};
export declare const PATTERNS: {
    PASSWORD: RegExp;
    PHONE: RegExp;
    APPLICATION_ID: RegExp;
    EMAIL: RegExp;
};
