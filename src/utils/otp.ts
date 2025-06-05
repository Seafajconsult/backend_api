import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { OTP } from '../config/constants';

interface OTPData {
  otp: string;
  expiresAt: Date;
}

@Injectable()
export class OtpService {
  // In-memory storage for OTPs (use Redis in production)
  private otpStorage = new Map<string, OTPData>();

  /**
   * Generate a random OTP
   */
  generateOtp(length: number = OTP.LENGTH): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += randomInt(0, 10).toString();
    }
    return otp;
  }

  /**
   * Store OTP with expiration
   */
  async storeOtp(email: string, otp: string, expiryMinutes: number = OTP.EXPIRY_MINUTES): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);

    this.otpStorage.set(email, { otp, expiresAt });
  }

  /**
   * Verify OTP
   */
  async verifyOtp(email: string, providedOtp: string): Promise<boolean> {
    const otpData = this.otpStorage.get(email);

    if (!otpData) {
      return false;
    }

    // Check if OTP has expired
    if (new Date() > otpData.expiresAt) {
      this.otpStorage.delete(email);
      return false;
    }

    // Check if OTP matches
    if (otpData.otp !== providedOtp) {
      return false;
    }

    // OTP is valid, remove it from storage
    this.otpStorage.delete(email);
    return true;
  }

  /**
   * Clear OTP for an email
   */
  async clearOtp(email: string): Promise<void> {
    this.otpStorage.delete(email);
  }

  /**
   * Clean up expired OTPs (should be called periodically)
   */
  cleanupExpiredOtps(): void {
    const now = new Date();
    for (const [email, otpData] of this.otpStorage.entries()) {
      if (now > otpData.expiresAt) {
        this.otpStorage.delete(email);
      }
    }
  }
}
