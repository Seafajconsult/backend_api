# SEA-FAJ Consult Backend

A comprehensive **Student & Employer Portal** backend system for **SEA-FAJ Consult** built with **Node.js, NestJS, Prisma, and PostgreSQL**.

## 🚀 Features

### **Multi-User System**
- **Students**: Application tracking, document management, visa support
- **Employers**: Recruitment services, company verification, job postings
- **Admins**: User management, application processing, system oversight
- **Super Admins**: Full system control, admin management

### **Core Functionality**
- 🔐 **JWT Authentication** with secure HTTP-only cookies
- 📧 **Email Service** with Brevo integration for OTP and notifications
- 💳 **Payment Processing** with Paystack integration
- 📁 **File Storage** with Cloudinary integration
- 💬 **Real-time Chat** with Socket.io WebSocket support
- 🔒 **Role-Based Access Control (RBAC)**
- 📊 **Comprehensive API Documentation** with Swagger
- 🛡️ **Security** with Helmet, CORS, and rate limiting

## 🛠️ Tech Stack

- **Framework**: NestJS with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with secure cookies
- **Email**: Brevo (SendinBlue) API
- **Payments**: Paystack API
- **File Storage**: Cloudinary
- **Real-time**: Socket.io
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, NestJS Throttler

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd sea-fajportal/backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/seafaj_db?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-minimum-32-characters-long"

# Brevo Email Service
BREVO_API_KEY="your-brevo-api-key"
BREVO_SENDER_EMAIL="noreply@sea-faj.com"

# Paystack Payment
PAYSTACK_SECRET_KEY="sk_test_your_paystack_secret_key"
PAYSTACK_PUBLIC_KEY="pk_test_your_paystack_public_key"

# Cloudinary File Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Application Configuration
NODE_ENV="development"
PORT=3000
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
FRONTEND_URL="http://localhost:3001"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with initial data
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Access the interactive API documentation:

- **Main Documentation**: http://localhost:3000/docs/student
- **Student Portal**: http://localhost:3000/docs/student
- **Employer Portal**: http://localhost:3000/docs/employer
- **Admin Portal**: http://localhost:3000/docs/admin

## 🔑 Default Credentials

After seeding the database, use these credentials:

### Super Admin
- **Email**: admin@sea-faj.com
- **Password**: SuperAdmin123!

### Development Test Accounts
- **Student**: student@example.com / Student123!
- **Employer**: employer@example.com / Employer123!
- **Admin**: admin.user@sea-faj.com / Admin123!

## 🏗️ Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── config/                 # Configuration files
│   ├── constants.ts        # Application constants
│   ├── jwt.config.ts       # JWT configuration
│   └── brevo.config.ts     # Email service config
├── common/                 # Shared utilities
│   ├── guards/             # Authentication guards
│   ├── interceptors/       # Request/response interceptors
│   ├── decorators/         # Custom decorators
│   └── filters/            # Exception filters
├── utils/                  # Utility services
│   ├── email.ts            # Email service
│   ├── otp.ts              # OTP generation/validation
│   ├── encryption.ts       # Encryption utilities
│   └── cloudinary.ts       # File upload service
├── auth/                   # Authentication module
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   ├── strategies/         # Passport strategies
│   └── dto/                # Data transfer objects
├── users/                  # User management
│   ├── student/            # Student-specific logic
│   ├── employer/           # Employer-specific logic
│   ├── admin/              # Admin-specific logic
│   └── super-admin/        # Super admin logic
├── chat/                   # Real-time chat system
│   ├── chat.gateway.ts     # WebSocket gateway
│   ├── chat.service.ts     # Chat business logic
│   └── dto/                # Chat DTOs
├── payments/               # Payment processing
│   ├── paystack.service.ts # Paystack integration
│   ├── webhook.controller.ts # Payment webhooks
│   └── dto/                # Payment DTOs
├── application/            # Application management
│   ├── student-tracker/    # Student application tracking
│   ├── employer-recruitment/ # Employer recruitment
│   └── visa-support/       # Visa application support
└── prisma/                 # Database
    ├── schema.prisma       # Database schema
    └── seed.ts             # Database seeding
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start development server
npm run start:debug        # Start with debugging

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:seed        # Seed database with initial data
npm run prisma:studio      # Open Prisma Studio
npm run prisma:reset       # Reset database

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/register/student` - Student registration
- `POST /api/v1/auth/register/employer` - Employer registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-email` - Email verification
- `POST /api/v1/auth/forgot-password` - Password reset request
- `GET /api/v1/auth/profile` - Get user profile

### Payments
- `POST /api/v1/payments/initialize` - Initialize payment
- `POST /api/v1/payments/verify/:reference` - Verify payment
- `GET /api/v1/payments/history` - Payment history

### Chat
- `GET /api/v1/chat/rooms` - Get user chat rooms
- `GET /api/v1/chat/rooms/:roomId` - Get room details
- WebSocket: `/chat` namespace for real-time messaging

### Webhooks
- `POST /api/v1/webhooks/paystack` - Paystack webhook

## 🔒 Security Features

- **JWT Authentication** with access and refresh tokens
- **HTTP-only Cookies** for secure token storage
- **Password Hashing** with bcrypt
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Helmet** for security headers
- **Input Validation** with class-validator
- **SQL Injection Protection** with Prisma

## 🚀 Deployment

### Environment Variables for Production

Ensure all environment variables are properly set for production:

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
# ... other production configurations
```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@sea-faj.com
- Documentation: [API Docs](http://localhost:3000/docs/student)

---

**SEA-FAJ Consult** - Empowering students and employers through technology.
