import { ConfigService } from '@nestjs/config';
export interface UploadResult {
    public_id: string;
    secure_url: string;
    format: string;
    resource_type: string;
    bytes: number;
}
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadFile(file: Buffer | string, folder: string, options?: any): Promise<UploadResult>;
    uploadDocument(file: Buffer, documentType: string, userId: string): Promise<UploadResult>;
    uploadProfileImage(file: Buffer, userId: string): Promise<UploadResult>;
    deleteFile(publicId: string, resourceType?: string): Promise<any>;
    generateTransformationUrl(publicId: string, transformations?: any): string;
    getOptimizedImageUrl(publicId: string, width?: number, height?: number): string;
    getPublicIdFromUrl(url: string): string;
}
