import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from '../config/constants';

export interface UploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  bytes: number;
}

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * Upload file to Cloudinary
   * @param file File buffer or base64 string
   * @param folder Folder to upload to
   * @param options Additional upload options
   * @returns Upload result
   */
  async uploadFile(
    file: Buffer | string,
    folder: string,
    options: any = {}
  ): Promise<UploadResult> {
    try {
      const fileData = Buffer.isBuffer(file) ? file.toString('base64') : file;
      const dataUri = `data:image/jpeg;base64,${fileData}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder,
        resource_type: 'auto',
        ...options,
      });

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
      };
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }

  /**
   * Upload document to Cloudinary
   * @param file File buffer
   * @param documentType Type of document
   * @param userId User ID for organization
   * @returns Upload result
   */
  async uploadDocument(
    file: Buffer,
    documentType: string,
    userId: string
  ): Promise<UploadResult> {
    const folder = `${CLOUDINARY.FOLDERS.DOCUMENTS}/${userId}`;
    const publicId = `${documentType}_${Date.now()}`;

    return this.uploadFile(file, folder, {
      public_id: publicId,
      resource_type: 'auto',
    });
  }

  /**
   * Upload profile image to Cloudinary
   * @param file File buffer
   * @param userId User ID
   * @returns Upload result
   */
  async uploadProfileImage(
    file: Buffer,
    userId: string
  ): Promise<UploadResult> {
    const folder = `${CLOUDINARY.FOLDERS.PROFILES}/${userId}`;
    const publicId = `profile_${Date.now()}`;

    return this.uploadFile(file, folder, {
      public_id: publicId,
      transformation: [
        { width: 400, height: 400, crop: 'fill' },
        { quality: 'auto' },
        { format: 'jpg' }
      ],
    });
  }

  /**
   * Delete file from Cloudinary
   * @param publicId Public ID of the file to delete
   * @param resourceType Type of resource (image, video, raw)
   * @returns Deletion result
   */
  async deleteFile(
    publicId: string,
    resourceType: string = 'image'
  ): Promise<any> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      return result;
    } catch (error) {
      throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
  }

  /**
   * Generate transformation URL
   * @param publicId Public ID of the file
   * @param transformations Transformation options
   * @returns Transformed URL
   */
  generateTransformationUrl(
    publicId: string,
    transformations: any = {}
  ): string {
    return cloudinary.url(publicId, transformations);
  }

  /**
   * Get optimized image URL
   * @param publicId Public ID of the image
   * @param width Desired width
   * @param height Desired height
   * @returns Optimized image URL
   */
  getOptimizedImageUrl(
    publicId: string,
    width?: number,
    height?: number
  ): string {
    const transformations: any = {
      quality: 'auto',
      format: 'auto',
    };

    if (width) transformations.width = width;
    if (height) transformations.height = height;
    if (width && height) transformations.crop = 'fill';

    return this.generateTransformationUrl(publicId, transformations);
  }

  /**
   * Get public ID from Cloudinary URL
   * @param url Cloudinary URL
   * @returns Public ID
   */
  getPublicIdFromUrl(url: string): string {
    const splitUrl = url.split('/');
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    return publicIdWithExtension.split('.')[0];
  }
}
