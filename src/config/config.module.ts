import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // Database
        DATABASE_URL: Joi.string().required(),

        // JWT
        JWT_SECRET: Joi.string().min(32).required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().min(32).required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

        // Brevo Email
        BREVO_API_KEY: Joi.string().required(),
        BREVO_SENDER_EMAIL: Joi.string().email().required(),
        BREVO_SENDER_NAME: Joi.string().required(),

        // Paystack
        PAYSTACK_SECRET_KEY: Joi.string().required(),
        PAYSTACK_PUBLIC_KEY: Joi.string().required(),
        PAYSTACK_WEBHOOK_SECRET: Joi.string().optional(),

        // Cloudinary
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),

        // Application
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        FRONTEND_URL: Joi.string().uri().required(),
        BACKEND_URL: Joi.string().uri().required(),
        CORS_ORIGIN: Joi.string().required(),

        // Cookie
        COOKIE_SECRET: Joi.string().min(32).required(),

        // Rate Limiting
        THROTTLE_TTL: Joi.number().default(60),
        THROTTLE_LIMIT: Joi.number().default(10),

        // File Upload
        MAX_FILE_SIZE: Joi.number().default(5242880), // 5MB in bytes
        ALLOWED_FILE_TYPES: Joi.string().default('image/jpeg,image/png,image/jpg,application/pdf'),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigModule {}
