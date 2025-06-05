import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  ValidationPipe as CustomValidationPipe,
  TransformInterceptor,
  LoggingInterceptor,
  TimeoutInterceptor,
} from './common';
import { COOKIE } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // Global middlewares
  app.use(helmet());
  app.use(cookieParser(COOKIE.SECRET));
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-paystack-signature'],
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global pipes
  app.useGlobalPipes(new CustomValidationPipe());

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(),
    new TimeoutInterceptor(),
  );

  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    // Base configuration
    const baseConfig = new DocumentBuilder()
      .setTitle('SEA-FAJ Portal API')
      .setDescription('API documentation for SEA-FAJ Student & Employer Portal')
      .setVersion('1.0')
      .addBearerAuth()
      .addCookieAuth('Authentication')
      .addServer('http://localhost:3000', 'Local environment')
      .addServer('https://api.sea-faj.com', 'Production environment');

    // Student documentation
    const studentConfig = baseConfig
      .setTitle('SEA-FAJ Student API')
      .addTag('Authentication', 'Student authentication endpoints')
      .addTag('Profile', 'Student profile management')
      .addTag('Applications', 'Student application management')
      .addTag('Documents', 'Document management')
      .addTag('Payments', 'Payment management')
      .build();

    const studentDocument = SwaggerModule.createDocument(app, studentConfig);
    SwaggerModule.setup('docs/student', app, studentDocument);

    // Employer documentation
    const employerConfig = baseConfig
      .setTitle('SEA-FAJ Employer API')
      .addTag('Authentication', 'Employer authentication endpoints')
      .addTag('Profile', 'Employer profile management')
      .addTag('Recruitment', 'Recruitment management')
      .addTag('Payments', 'Payment management')
      .build();

    const employerDocument = SwaggerModule.createDocument(app, employerConfig);
    SwaggerModule.setup('docs/employer', app, employerDocument);

    // Admin documentation
    const adminConfig = baseConfig
      .setTitle('SEA-FAJ Admin API')
      .addTag('Authentication', 'Admin authentication endpoints')
      .addTag('Students', 'Student management')
      .addTag('Employers', 'Employer management')
      .addTag('Applications', 'Application management')
      .addTag('Payments', 'Payment management')
      .addTag('System', 'System management')
      .build();

    const adminDocument = SwaggerModule.createDocument(app, adminConfig);
    SwaggerModule.setup('docs/admin', app, adminDocument);
  }

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`
Swagger documentation is available at:
- Students: http://localhost:${port}/docs/student
- Employers: http://localhost:${port}/docs/employer
- Admins: http://localhost:${port}/docs/admin`);
  }
}

bootstrap();
