export declare class OtpService {
    private otpStorage;
    generateOtp(length?: number): string;
    storeOtp(email: string, otp: string, expiryMinutes?: number): Promise<void>;
    verifyOtp(email: string, providedOtp: string): Promise<boolean>;
    clearOtp(email: string): Promise<void>;
    cleanupExpiredOtps(): void;
}
