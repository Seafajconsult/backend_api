export declare class EncryptionService {
    private readonly algorithm;
    private readonly secretKey;
    generateToken(length?: number): string;
    generateSecureString(length?: number): string;
    hashPassword(password: string, saltRounds?: number): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    createHash(data: string, algorithm?: string): string;
    createHmac(data: string, secret: string, algorithm?: string): string;
    verifyHmac(data: string, signature: string, secret: string, algorithm?: string): boolean;
    generateApplicationId(): string;
    generateReferralCode(prefix?: string): string;
    encryptData(data: string): string;
    decryptData(encryptedData: string): string;
}
