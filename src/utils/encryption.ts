import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly secretKey = process.env.ENCRYPTION_SECRET || 'default-secret-key-32-characters-long';

  /**
   * Generate a random token
   * @param length Token length in bytes (default: 32)
   * @returns Random token as hex string
   */
  generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Generate a secure random string
   * @param length String length
   * @returns Random string
   */
  generateSecureString(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Hash a password using bcrypt
   * @param password Plain text password
   * @param saltRounds Number of salt rounds (default: 12)
   * @returns Hashed password
   */
  async hashPassword(password: string, saltRounds: number = 12): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify a password against its hash
   * @param password Plain text password
   * @param hash Hashed password
   * @returns Boolean indicating if password is valid
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Create a hash of any string
   * @param data String to hash
   * @param algorithm Hash algorithm (default: sha256)
   * @returns Hashed string
   */
  createHash(data: string, algorithm: string = 'sha256'): string {
    return crypto.createHash(algorithm).update(data).digest('hex');
  }

  /**
   * Create HMAC signature
   * @param data Data to sign
   * @param secret Secret key
   * @param algorithm Algorithm to use (default: sha256)
   * @returns HMAC signature
   */
  createHmac(data: string, secret: string, algorithm: string = 'sha256'): string {
    return crypto.createHmac(algorithm, secret).update(data).digest('hex');
  }

  /**
   * Verify HMAC signature
   * @param data Original data
   * @param signature Signature to verify
   * @param secret Secret key
   * @param algorithm Algorithm used (default: sha256)
   * @returns Boolean indicating if signature is valid
   */
  verifyHmac(data: string, signature: string, secret: string, algorithm: string = 'sha256'): boolean {
    const expectedSignature = this.createHmac(data, secret, algorithm);
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }

  /**
   * Generate an application ID with prefix
   * @returns Formatted application ID (e.g., SEA-123456)
   */
  generateApplicationId(): string {
    const numeric = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    return `SEA-${numeric}`;
  }
  /**
   * Generate a referral code
   * @param prefix Optional prefix for the code
   * @returns Referral code
   */
  generateReferralCode(prefix?: string): string {
    const code = this.generateSecureString(8).toUpperCase();
    return prefix ? `${prefix}-${code}` : code;
  }

  /**
   * Encrypt sensitive data (symmetric encryption)
   * @param data Data to encrypt
   * @returns Encrypted data
   */
  encryptData(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey.slice(0, 32)), iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Return IV:AuthTag:EncryptedData
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  /**
   * Decrypt encrypted data (symmetric decryption)
   * @param encryptedData Encrypted data string (IV:AuthTag:EncryptedData format)
   * @returns Decrypted data
   */
  decryptData(encryptedData: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey.slice(0, 32)), iv);

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
