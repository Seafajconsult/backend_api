/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/users/users.module.ts");
const chat_module_1 = __webpack_require__(/*! ./chat/chat.module */ "./src/chat/chat.module.ts");
const payments_module_1 = __webpack_require__(/*! ./payments/payments.module */ "./src/payments/payments.module.ts");
const application_module_1 = __webpack_require__(/*! ./application/application.module */ "./src/application/application.module.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./src/prisma/prisma.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: parseInt(process.env.THROTTLE_TTL || '60'),
                    limit: parseInt(process.env.THROTTLE_LIMIT || '10'),
                }]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            chat_module_1.ChatModule,
            payments_module_1.PaymentsModule,
            application_module_1.ApplicationModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./src/application/application.module.ts":
/*!***********************************************!*\
  !*** ./src/application/application.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApplicationModule);


/***/ }),

/***/ "./src/auth/auth.controller.ts":
/*!*************************************!*\
  !*** ./src/auth/auth.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const common_2 = __webpack_require__(/*! ../common */ "./src/common/index.ts");
const dto_1 = __webpack_require__(/*! ./dto */ "./src/auth/dto/index.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerStudent(registerDto) {
        return this.authService.register(registerDto);
    }
    async registerEmployer(registerDto) {
        return this.authService.register(registerDto);
    }
    async registerAdmin(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto, response) {
        const result = await this.authService.login(loginDto);
        response.cookie('Authentication', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });
        response.cookie('Refresh', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return result;
    }
    async verifyEmail(verifyOtpDto) {
        return this.authService.verifyEmail(verifyOtpDto);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
    async resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    async logout(response) {
        response.clearCookie('Authentication');
        response.clearCookie('Refresh');
        return { message: 'Logout successful' };
    }
    async getProfile(req) {
        return {
            message: 'Profile retrieved successfully',
            data: req.user,
        };
    }
    async test() {
        return {
            message: 'Auth module is working correctly',
            timestamp: new Date().toISOString(),
            endpoints: [
                'POST /auth/register/student',
                'POST /auth/register/employer',
                'POST /auth/register/admin',
                'POST /auth/login',
                'POST /auth/verify-email',
                'POST /auth/forgot-password',
                'POST /auth/reset-password',
                'POST /auth/logout',
                'GET /auth/profile',
            ],
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('register/student'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new student' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Student registered successfully', type: dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StudentRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerStudent", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('register/employer'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new employer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Employer registered successfully', type: dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EmployerRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerEmployer", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('register/admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new admin (Super Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Admin registered successfully', type: dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AdminRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful', type: dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: (__webpack_require__(/*! ./src/auth/dto/response.dto */ "./src/auth/dto/response.dto.ts").AuthResponseDto) }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('verify-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify email with OTP' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verified successfully', type: dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired OTP' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reset code sent if email exists', type: dto_1.MessageResponseDto }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password with OTP' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successfully', type: dto_1.MessageResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired OTP' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'User logout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout successful', type: dto_1.MessageResponseDto }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint for auth module' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Auth module is working' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);


/***/ }),

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/auth/strategies/jwt.strategy.ts");
const jwt_config_1 = __webpack_require__(/*! ../config/jwt.config */ "./src/config/jwt.config.ts");
const email_1 = __webpack_require__(/*! ../utils/email */ "./src/utils/email.ts");
const otp_1 = __webpack_require__(/*! ../utils/otp */ "./src/utils/otp.ts");
const encryption_1 = __webpack_require__(/*! ../utils/encryption */ "./src/utils/encryption.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useClass: jwt_config_1.JwtConfig,
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_config_1.JwtConfig,
            email_1.EmailService,
            otp_1.OtpService,
            encryption_1.EncryptionService,
        ],
        exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);


/***/ }),

/***/ "./src/auth/auth.service.ts":
/*!**********************************!*\
  !*** ./src/auth/auth.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const types_1 = __webpack_require__(/*! ../prisma/types */ "./src/prisma/types/index.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./src/prisma/prisma.service.ts");
const email_1 = __webpack_require__(/*! ../utils/email */ "./src/utils/email.ts");
const otp_1 = __webpack_require__(/*! ../utils/otp */ "./src/utils/otp.ts");
const encryption_1 = __webpack_require__(/*! ../utils/encryption */ "./src/utils/encryption.ts");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService, emailService, otpService, encryptionService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
        this.otpService = otpService;
        this.encryptionService = encryptionService;
    }
    async register(registerDto) {
        const { email, password, role } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        let result;
        switch (role) {
            case types_1.UserRole.STUDENT:
                result = await this.registerStudent(registerDto, hashedPassword);
                break;
            case types_1.UserRole.EMPLOYER:
                result = await this.registerEmployer(registerDto, hashedPassword);
                break;
            case types_1.UserRole.ADMIN:
                result = await this.registerAdmin(registerDto, hashedPassword);
                break;
            default:
                throw new common_1.BadRequestException('Invalid user role');
        }
        const otp = this.otpService.generateOtp();
        await this.otpService.storeOtp(email, otp);
        await this.emailService.sendVerificationEmail(email, otp);
        return result;
    }
    async registerStudent(studentDto, hashedPassword) {
        const applicationId = this.generateApplicationId();
        const referralCode = this.generateReferralCode();
        const user = await this.prisma.user.create({
            data: {
                email: studentDto.email,
                password: hashedPassword,
                role: types_1.UserRole.STUDENT,
                student: {
                    create: {
                        applicationId,
                        firstName: studentDto.firstName,
                        lastName: studentDto.lastName,
                        dateOfBirth: new Date(studentDto.dateOfBirth),
                        nationality: studentDto.nationality,
                        phone: studentDto.phone,
                        address: studentDto.address,
                        currentEducation: studentDto.currentEducation,
                        referralCode,
                        referredBy: studentDto.referredBy,
                    },
                },
            },
        });
        await this.emailService.sendWelcomeEmail(studentDto.email, `${studentDto.firstName} ${studentDto.lastName}`, applicationId);
        return {
            message: 'Student registration successful. Please verify your email.',
            applicationId,
        };
    }
    async registerEmployer(employerDto, hashedPassword) {
        await this.prisma.user.create({
            data: {
                email: employerDto.email,
                password: hashedPassword,
                role: types_1.UserRole.EMPLOYER,
                employer: {
                    create: {
                        companyName: employerDto.companyName,
                        registrationNumber: employerDto.registrationNumber,
                        companySize: employerDto.companySize,
                        industry: employerDto.industry,
                        website: employerDto.website,
                        address: employerDto.address,
                        phone: employerDto.phone,
                    },
                },
            },
        });
        return {
            message: 'Employer registration successful. Please verify your email and wait for admin approval.',
        };
    }
    async registerAdmin(adminDto, hashedPassword) {
        await this.prisma.user.create({
            data: {
                email: adminDto.email,
                password: hashedPassword,
                role: types_1.UserRole.ADMIN,
                status: types_1.UserStatus.ACTIVE,
                admin: {
                    create: {
                        firstName: adminDto.firstName,
                        lastName: adminDto.lastName,
                        department: adminDto.department,
                        assignedRole: adminDto.assignedRole,
                    },
                },
            },
        });
        return {
            message: 'Admin registration successful. Please verify your email.',
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                student: true,
                employer: true,
                admin: true,
                superAdmin: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.status === types_1.UserStatus.PENDING) {
            throw new common_1.UnauthorizedException('Please verify your email first');
        }
        if (user.status === types_1.UserStatus.SUSPENDED) {
            throw new common_1.UnauthorizedException('Your account has been suspended');
        }
        if (user.status === types_1.UserStatus.INACTIVE) {
            throw new common_1.UnauthorizedException('Your account is inactive');
        }
        const tokens = await this.generateTokens(user);
        let profile;
        switch (user.role) {
            case types_1.UserRole.STUDENT:
                profile = user.student;
                break;
            case types_1.UserRole.EMPLOYER:
                profile = user.employer;
                break;
            case types_1.UserRole.ADMIN:
                profile = user.admin;
                break;
            case types_1.UserRole.SUPER_ADMIN:
                profile = user.superAdmin;
                break;
        }
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
                profile,
            },
        };
    }
    async verifyEmail(verifyOtpDto) {
        const { email, otp } = verifyOtpDto;
        const isValidOtp = await this.otpService.verifyOtp(email, otp);
        if (!isValidOtp) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.user.update({
            where: { email },
            data: { status: types_1.UserStatus.ACTIVE },
        });
        await this.otpService.clearOtp(email);
        return { message: 'Email verified successfully' };
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return { message: 'If the email exists, a reset code has been sent' };
        }
        const otp = this.otpService.generateOtp();
        await this.otpService.storeOtp(email, otp);
        await this.emailService.sendPasswordResetEmail(email, otp);
        return { message: 'If the email exists, a reset code has been sent' };
    }
    async resetPassword(resetPasswordDto) {
        const { email, otp, newPassword } = resetPasswordDto;
        const isValidOtp = await this.otpService.verifyOtp(email, otp);
        if (!isValidOtp) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
        await this.otpService.clearOtp(email);
        return { message: 'Password reset successfully' };
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    generateApplicationId() {
        const timestamp = Date.now().toString().slice(-6);
        return `SEA-${timestamp}`;
    }
    generateReferralCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_1.EmailService,
        otp_1.OtpService,
        encryption_1.EncryptionService])
], AuthService);


/***/ }),

/***/ "./src/auth/dto/index.ts":
/*!*******************************!*\
  !*** ./src/auth/dto/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./register.dto */ "./src/auth/dto/register.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./login.dto */ "./src/auth/dto/login.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./response.dto */ "./src/auth/dto/response.dto.ts"), exports);


/***/ }),

/***/ "./src/auth/dto/login.dto.ts":
/*!***********************************!*\
  !*** ./src/auth/dto/login.dto.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.VerifyOtpDto = exports.LoginDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 1 } };
    }
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class VerifyOtpDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, otp: { required: true, type: () => String, minLength: 6 } };
    }
}
exports.VerifyOtpDto = VerifyOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "otp", void 0);
class ForgotPasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String } };
    }
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, otp: { required: true, type: () => String, minLength: 6 }, newPassword: { required: true, type: () => String, minLength: 8 } };
    }
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NewPassword123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
class RefreshTokenDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { refreshToken: { required: true, type: () => String } };
    }
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'refresh_token_here' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);


/***/ }),

/***/ "./src/auth/dto/register.dto.ts":
/*!**************************************!*\
  !*** ./src/auth/dto/register.dto.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminRegisterDto = exports.EmployerRegisterDto = exports.StudentRegisterDto = exports.RegisterDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const types_1 = __webpack_require__(/*! ../../prisma/types */ "./src/prisma/types/index.ts");
const constants_1 = __webpack_require__(/*! ../../config/constants */ "./src/config/constants.ts");
class RegisterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, role: { required: true, enum: (__webpack_require__(/*! ./src/prisma/types/index */ "./src/prisma/types/index.ts").UserRole) } };
    }
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password123!', minLength: 8 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(constants_1.PATTERNS.PASSWORD, {
        message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: types_1.UserRole, example: types_1.UserRole.STUDENT }),
    (0, class_validator_1.IsEnum)(types_1.UserRole),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
class StudentRegisterDto extends RegisterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, dateOfBirth: { required: true, type: () => String }, nationality: { required: true, type: () => String }, phone: { required: false, type: () => String }, address: { required: false, type: () => String }, currentEducation: { required: false, type: () => String }, referredBy: { required: false, type: () => String } };
    }
}
exports.StudentRegisterDto = StudentRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1995-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nigerian' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+2348012345678', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main Street, Lagos, Nigeria', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bachelor of Science in Computer Science', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "currentEducation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REF123456', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "referredBy", void 0);
class EmployerRegisterDto extends RegisterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { companyName: { required: true, type: () => String }, registrationNumber: { required: true, type: () => String }, companySize: { required: false, type: () => Number }, industry: { required: false, type: () => String }, website: { required: false, type: () => String }, address: { required: true, type: () => String }, phone: { required: true, type: () => String } };
    }
}
exports.EmployerRegisterDto = EmployerRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tech Solutions Ltd' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployerRegisterDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'RC123456' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployerRegisterDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EmployerRegisterDto.prototype, "companySize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Technology', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployerRegisterDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://techsolutions.com', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployerRegisterDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '456 Business District, Lagos, Nigeria' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployerRegisterDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+2348012345678' }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], EmployerRegisterDto.prototype, "phone", void 0);
class AdminRegisterDto extends RegisterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, department: { required: true, type: () => String }, assignedRole: { required: true, type: () => String } };
    }
}
exports.AdminRegisterDto = AdminRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Smith' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Student Management' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'student_management' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "assignedRole", void 0);


/***/ }),

/***/ "./src/auth/dto/response.dto.ts":
/*!**************************************!*\
  !*** ./src/auth/dto/response.dto.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageResponseDto = exports.AdminProfileDto = exports.EmployerProfileDto = exports.StudentProfileDto = exports.AuthResponseDto = exports.UserProfileDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const types_1 = __webpack_require__(/*! ../../prisma/types */ "./src/prisma/types/index.ts");
class UserProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, email: { required: true, type: () => String }, role: { required: true, enum: (__webpack_require__(/*! ./src/prisma/types/index */ "./src/prisma/types/index.ts").UserRole) }, status: { required: true, enum: (__webpack_require__(/*! ./src/prisma/types/index */ "./src/prisma/types/index.ts").UserStatus) }, profile: { required: true, type: () => Object } };
    }
}
exports.UserProfileDto = UserProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: types_1.UserRole }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: types_1.UserStatus }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "profile", void 0);
class AuthResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String }, user: { required: true, type: () => (__webpack_require__(/*! ./src/auth/dto/response.dto */ "./src/auth/dto/response.dto.ts").UserProfileDto) } };
    }
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UserProfileDto)
], AuthResponseDto.prototype, "user", void 0);
class StudentProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, applicationId: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, dateOfBirth: { required: true, type: () => Date }, nationality: { required: true, type: () => String }, phone: { required: false, type: () => String }, address: { required: false, type: () => String }, currentEducation: { required: false, type: () => String }, referralCode: { required: false, type: () => String }, referredBy: { required: false, type: () => String } };
    }
}
exports.StudentProfileDto = StudentProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "applicationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], StudentProfileDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "currentEducation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "referralCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "referredBy", void 0);
class EmployerProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, companyName: { required: true, type: () => String }, registrationNumber: { required: true, type: () => String }, companySize: { required: false, type: () => Number }, industry: { required: false, type: () => String }, website: { required: false, type: () => String }, address: { required: true, type: () => String }, phone: { required: true, type: () => String }, verificationDoc: { required: false, type: () => String } };
    }
}
exports.EmployerProfileDto = EmployerProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], EmployerProfileDto.prototype, "companySize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], EmployerProfileDto.prototype, "verificationDoc", void 0);
class AdminProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, department: { required: true, type: () => String }, assignedRole: { required: true, type: () => String } };
    }
}
exports.AdminProfileDto = AdminProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "assignedRole", void 0);
class MessageResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, data: { required: false, type: () => Object } };
    }
}
exports.MessageResponseDto = MessageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Object)
], MessageResponseDto.prototype, "data", void 0);


/***/ }),

/***/ "./src/auth/strategies/jwt.strategy.ts":
/*!*********************************************!*\
  !*** ./src/auth/strategies/jwt.strategy.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const prisma_service_1 = __webpack_require__(/*! ../../prisma/prisma.service */ "./src/prisma/prisma.service.ts");
const constants_1 = __webpack_require__(/*! ../../config/constants */ "./src/config/constants.ts");
const types_1 = __webpack_require__(/*! ../../prisma/types */ "./src/prisma/types/index.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => {
                    const token = req?.cookies?.['Authentication'];
                    if (!token)
                        return null;
                    return token;
                },
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: constants_1.JWT.ACCESS_TOKEN_SECRET,
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                include: {
                    ...(payload.role === types_1.UserRole.STUDENT && { student: true }),
                    ...(payload.role === types_1.UserRole.EMPLOYER && { employer: true }),
                    ...(payload.role === types_1.UserRole.ADMIN && { admin: true }),
                    ...(payload.role === types_1.UserRole.SUPER_ADMIN && { superAdmin: true }),
                },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User no longer exists');
            }
            if (user.status !== types_1.UserStatus.ACTIVE) {
                throw new common_1.UnauthorizedException(`Account is ${user.status.toLowerCase()}`);
            }
            let profile;
            switch (payload.role) {
                case types_1.UserRole.STUDENT:
                    profile = user.student;
                    break;
                case types_1.UserRole.EMPLOYER:
                    profile = user.employer;
                    break;
                case types_1.UserRole.ADMIN:
                    profile = user.admin;
                    break;
                case types_1.UserRole.SUPER_ADMIN:
                    profile = user.superAdmin;
                    break;
            }
            if (!profile) {
                throw new common_1.UnauthorizedException('User profile not found');
            }
            return {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
                profile,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JwtStrategy);


/***/ }),

/***/ "./src/chat/chat.controller.ts":
/*!*************************************!*\
  !*** ./src/chat/chat.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const chat_service_1 = __webpack_require__(/*! ./chat.service */ "./src/chat/chat.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getUserChatRooms(req) {
        return this.chatService.getUserChatRooms(req.user.id);
    }
    async getChatRoomDetails(roomId, req) {
        return this.chatService.getChatRoomDetails(roomId, req.user.id);
    }
    async getRoomMessages(roomId, limit = '50', req) {
        const hasAccess = await this.chatService.verifyRoomAccess(req.user.id, roomId);
        if (!hasAccess) {
            throw new Error('Access denied to this chat room');
        }
        return this.chatService.getRoomMessages(roomId, parseInt(limit));
    }
    async sendMessage(roomId, body, req) {
        const hasAccess = await this.chatService.verifyRoomAccess(req.user.id, roomId);
        if (!hasAccess) {
            throw new Error('Access denied to this chat room');
        }
        return this.chatService.createMessage({
            content: body.content,
            senderId: req.user.id,
            roomId,
        });
    }
    async markMessagesAsRead(roomId, req) {
        return this.chatService.markMessagesAsRead(roomId, req.user.id);
    }
    async test() {
        return {
            message: 'Chat module is working correctly',
            timestamp: new Date().toISOString(),
            websocket: {
                namespace: '/chat',
                events: [
                    'join_room',
                    'send_message',
                    'leave_room',
                    'typing_start',
                    'typing_stop',
                ],
            },
            endpoints: [
                'GET /chat/rooms',
                'GET /chat/rooms/:roomId',
                'GET /chat/rooms/:roomId/messages',
                'POST /chat/rooms/:roomId/messages',
                'POST /chat/rooms/:roomId/read',
            ],
        };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('rooms'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat rooms for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat rooms retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUserChatRooms", null);
__decorate([
    (0, common_1.Get)('rooms/:roomId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat room details and messages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat room details retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied to this chat room' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatRoomDetails", null);
__decorate([
    (0, common_1.Get)('rooms/:roomId/messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get messages for a chat room' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied to this chat room' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoomMessages", null);
__decorate([
    (0, common_1.Post)('rooms/:roomId/messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message to a chat room (REST endpoint)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sent successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied to this chat room' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('rooms/:roomId/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark messages as read in a chat room' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages marked as read successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied to this chat room' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markMessagesAsRead", null);
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test chat module' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat module is working' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "test", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat'),
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);


/***/ }),

/***/ "./src/chat/chat.gateway.ts":
/*!**********************************!*\
  !*** ./src/chat/chat.gateway.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const chat_service_1 = __webpack_require__(/*! ./chat.service */ "./src/chat/chat.service.ts");
const ws_jwt_guard_1 = __webpack_require__(/*! ../common/guards/ws-jwt.guard */ "./src/common/guards/ws-jwt.guard.ts");
const dto_1 = __webpack_require__(/*! ./dto */ "./src/chat/dto/index.ts");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger(ChatGateway_1.name);
        this.connectedUsers = new Map();
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
            if (!token) {
                client.disconnect();
                return;
            }
            const user = await this.chatService.verifySocketToken(token);
            if (!user) {
                client.disconnect();
                return;
            }
            client.data.user = user;
            this.connectedUsers.set(client.id, user.id);
            this.logger.log(`User ${user.email} connected with socket ${client.id}`);
            client.join(`user_${user.id}`);
            client.emit('connected', { message: 'Connected successfully', user: user });
        }
        catch (error) {
            this.logger.error('Connection error:', error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = this.connectedUsers.get(client.id);
        if (userId) {
            this.connectedUsers.delete(client.id);
            this.logger.log(`User ${userId} disconnected`);
        }
    }
    async handleJoinRoom(joinRoomDto, client) {
        try {
            const { roomId } = joinRoomDto;
            const user = client.data.user;
            const hasAccess = await this.chatService.verifyRoomAccess(user.id, roomId);
            if (!hasAccess) {
                client.emit('error', { message: 'Access denied to this room' });
                return;
            }
            client.join(roomId);
            const messages = await this.chatService.getRoomMessages(roomId, 50);
            client.emit('joined_room', { roomId, messages });
            client.to(roomId).emit('user_joined', { userId: user.id, email: user.email });
            this.logger.log(`User ${user.email} joined room ${roomId}`);
        }
        catch (error) {
            this.logger.error('Join room error:', error);
            client.emit('error', { message: 'Failed to join room' });
        }
    }
    async handleSendMessage(sendMessageDto, client) {
        try {
            const { roomId, content } = sendMessageDto;
            const user = client.data.user;
            const hasAccess = await this.chatService.verifyRoomAccess(user.id, roomId);
            if (!hasAccess) {
                client.emit('error', { message: 'Access denied to this room' });
                return;
            }
            const message = await this.chatService.createMessage({
                content,
                senderId: user.id,
                roomId,
            });
            this.server.to(roomId).emit('new_message', {
                id: message.id,
                content: message.content,
                senderId: message.senderId,
                roomId: message.roomId,
                createdAt: message.createdAt,
                sender: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            });
            this.logger.log(`Message sent in room ${roomId} by user ${user.email}`);
        }
        catch (error) {
            this.logger.error('Send message error:', error);
            client.emit('error', { message: 'Failed to send message' });
        }
    }
    async handleLeaveRoom(data, client) {
        const { roomId } = data;
        const user = client.data.user;
        client.leave(roomId);
        client.to(roomId).emit('user_left', { userId: user.id, email: user.email });
        this.logger.log(`User ${user.email} left room ${roomId}`);
    }
    async handleTypingStart(data, client) {
        const { roomId } = data;
        const user = client.data.user;
        client.to(roomId).emit('user_typing', {
            userId: user.id,
            email: user.email,
            isTyping: true
        });
    }
    async handleTypingStop(data, client) {
        const { roomId } = data;
        const user = client.data.user;
        client.to(roomId).emit('user_typing', {
            userId: user.id,
            email: user.email,
            isTyping: false
        });
    }
    async sendNotificationToUser(userId, notification) {
        this.server.to(`user_${userId}`).emit('notification', notification);
    }
    async sendMessageToRoom(roomId, message) {
        this.server.to(roomId).emit('system_message', message);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('join_room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.JoinRoomDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('send_message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SendMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('leave_room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('typing_start'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTypingStart", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('typing_stop'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTypingStop", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3001',
            credentials: true,
        },
        namespace: '/chat',
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);


/***/ }),

/***/ "./src/chat/chat.module.ts":
/*!*********************************!*\
  !*** ./src/chat/chat.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const chat_controller_1 = __webpack_require__(/*! ./chat.controller */ "./src/chat/chat.controller.ts");
const chat_gateway_1 = __webpack_require__(/*! ./chat.gateway */ "./src/chat/chat.gateway.ts");
const chat_service_1 = __webpack_require__(/*! ./chat.service */ "./src/chat/chat.service.ts");
const ws_jwt_guard_1 = __webpack_require__(/*! ../common/guards/ws-jwt.guard */ "./src/common/guards/ws-jwt.guard.ts");
const jwt_config_1 = __webpack_require__(/*! ../config/jwt.config */ "./src/config/jwt.config.ts");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useClass: jwt_config_1.JwtConfig,
            }),
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService, ws_jwt_guard_1.WsJwtGuard],
        exports: [chat_service_1.ChatService, chat_gateway_1.ChatGateway],
    })
], ChatModule);


/***/ }),

/***/ "./src/chat/chat.service.ts":
/*!**********************************!*\
  !*** ./src/chat/chat.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./src/prisma/prisma.service.ts");
const types_1 = __webpack_require__(/*! ../prisma/types */ "./src/prisma/types/index.ts");
let ChatService = class ChatService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async verifySocketToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    status: true,
                },
            });
            if (!user || user.status !== 'ACTIVE') {
                return null;
            }
            return user;
        }
        catch (error) {
            return null;
        }
    }
    async verifyRoomAccess(userId, roomId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                student: true,
                employer: true,
                admin: true,
                superAdmin: true,
            },
        });
        if (!user)
            return false;
        if (user.role === types_1.UserRole.ADMIN || user.role === types_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        if (user.role === types_1.UserRole.STUDENT && user.student) {
            return roomId === `student_${user.student.id}_admin`;
        }
        if (user.role === types_1.UserRole.EMPLOYER && user.employer) {
            return roomId === `employer_${user.employer.id}_admin`;
        }
        return false;
    }
    async createMessage(createMessageDto) {
        return this.prisma.chatMessage.create({
            data: createMessageDto,
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
    }
    async getRoomMessages(roomId, limit = 50) {
        return this.prisma.chatMessage.findMany({
            where: { roomId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
    }
    async getUserChatRooms(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                student: true,
                employer: true,
                admin: true,
                superAdmin: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        let rooms = [];
        if (user.role === types_1.UserRole.STUDENT && user.student) {
            rooms.push({
                id: `student_${user.student.id}_admin`,
                name: 'Support Chat',
                type: 'support',
                participants: ['student', 'admin'],
            });
        }
        if (user.role === types_1.UserRole.EMPLOYER && user.employer) {
            rooms.push({
                id: `employer_${user.employer.id}_admin`,
                name: 'Recruitment Support',
                type: 'support',
                participants: ['employer', 'admin'],
            });
        }
        if (user.role === types_1.UserRole.ADMIN || user.role === types_1.UserRole.SUPER_ADMIN) {
            const students = await this.prisma.student.findMany({
                where: {
                    user: {
                        status: 'ACTIVE',
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            });
            const employers = await this.prisma.employer.findMany({
                where: {
                    user: {
                        status: 'ACTIVE',
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            });
            students.forEach(student => {
                rooms.push({
                    id: `student_${student.id}_admin`,
                    name: `${student.firstName} ${student.lastName}`,
                    type: 'student_support',
                    participants: ['student', 'admin'],
                    userEmail: student.user.email,
                });
            });
            employers.forEach(employer => {
                rooms.push({
                    id: `employer_${employer.id}_admin`,
                    name: employer.companyName,
                    type: 'employer_support',
                    participants: ['employer', 'admin'],
                    userEmail: employer.user.email,
                });
            });
        }
        return rooms;
    }
    async getChatRoomDetails(roomId, userId) {
        const hasAccess = await this.verifyRoomAccess(userId, roomId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('Access denied to this chat room');
        }
        const messages = await this.getRoomMessages(roomId, 100);
        let roomInfo = { name: 'Chat Room', type: 'general' };
        if (roomId.startsWith('student_')) {
            const studentId = roomId.split('_')[1];
            const student = await this.prisma.student.findUnique({
                where: { id: studentId },
                select: {
                    firstName: true,
                    lastName: true,
                    user: {
                        select: { email: true },
                    },
                },
            });
            if (student) {
                roomInfo = {
                    name: `${student.firstName} ${student.lastName}`,
                    type: 'student_support',
                };
            }
        }
        else if (roomId.startsWith('employer_')) {
            const employerId = roomId.split('_')[1];
            const employer = await this.prisma.employer.findUnique({
                where: { id: employerId },
                select: {
                    companyName: true,
                    user: {
                        select: { email: true },
                    },
                },
            });
            if (employer) {
                roomInfo = {
                    name: employer.companyName,
                    type: 'employer_support',
                };
            }
        }
        return {
            roomId,
            ...roomInfo,
            messages: messages.reverse(),
        };
    }
    async markMessagesAsRead(roomId, userId) {
        const hasAccess = await this.verifyRoomAccess(userId, roomId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('Access denied to this chat room');
        }
        return { success: true, message: 'Messages marked as read' };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], ChatService);


/***/ }),

/***/ "./src/chat/dto/chat.dto.ts":
/*!**********************************!*\
  !*** ./src/chat/dto/chat.dto.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoomDto = exports.JoinRoomDto = exports.SendMessageDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class SendMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roomId: { required: true, type: () => String }, content: { required: true, type: () => String, maxLength: 1000 } };
    }
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'student_123_admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello, I need help with my application.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], SendMessageDto.prototype, "content", void 0);
class JoinRoomDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roomId: { required: true, type: () => String } };
    }
}
exports.JoinRoomDto = JoinRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'student_123_admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], JoinRoomDto.prototype, "roomId", void 0);
class CreateRoomDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, type: { required: false, type: () => String }, participants: { required: false, type: () => [String] } };
    }
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Support Chat' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'support', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['user1', 'user2'], required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRoomDto.prototype, "participants", void 0);


/***/ }),

/***/ "./src/chat/dto/index.ts":
/*!*******************************!*\
  !*** ./src/chat/dto/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./chat.dto */ "./src/chat/dto/chat.dto.ts"), exports);


/***/ }),

/***/ "./src/common/decorators/roles.decorator.ts":
/*!**************************************************!*\
  !*** ./src/common/decorators/roles.decorator.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/common/enums/user-role.enum.ts":
/*!********************************************!*\
  !*** ./src/common/enums/user-role.enum.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["EMPLOYER"] = "EMPLOYER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));


/***/ }),

/***/ "./src/common/filters/http-exception.filter.ts":
/*!*****************************************************!*\
  !*** ./src/common/filters/http-exception.filter.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const library_1 = __webpack_require__(/*! @prisma/client/runtime/library */ "@prisma/client/runtime/library");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message || exceptionResponse;
            error = exceptionResponse.error || exception.name;
        }
        else if (exception instanceof library_1.PrismaClientKnownRequestError) {
            switch (exception.code) {
                case 'P2002':
                    status = common_1.HttpStatus.CONFLICT;
                    message = 'Unique constraint violation';
                    error = 'Conflict';
                    break;
                case 'P2025':
                    status = common_1.HttpStatus.NOT_FOUND;
                    message = 'Record not found';
                    error = 'Not Found';
                    break;
                case 'P2003':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Foreign key constraint violation';
                    error = 'Bad Request';
                    break;
                default:
                    message = 'Database error';
                    error = 'Database Error';
            }
        }
        this.logger.error(`${request.method} ${request.url}`, exception instanceof Error ? exception.stack : 'No stack trace', 'ExceptionFilter');
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            error,
            message,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);


/***/ }),

/***/ "./src/common/guards/jwt-auth.guard.ts":
/*!*********************************************!*\
  !*** ./src/common/guards/jwt-auth.guard.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
    handleRequest(err, user, info) {
        if (info instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new common_1.UnauthorizedException('Token has expired');
        }
        if (info instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        if (err || !user) {
            throw new common_1.UnauthorizedException(err?.message || 'Authentication required');
        }
        return user;
    }
    async canActivate(context) {
        const isPublic = Reflect.getMetadata('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        const result = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        if (result && request.user) {
            if (request.user.status === 'SUSPENDED') {
                throw new common_1.UnauthorizedException('Account is suspended');
            }
            if (request.user.status === 'INACTIVE') {
                throw new common_1.UnauthorizedException('Account is inactive');
            }
        }
        return result;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtAuthGuard);
const Public = () => Reflect.metadata('isPublic', true);
exports.Public = Public;


/***/ }),

/***/ "./src/common/guards/roles.guard.ts":
/*!******************************************!*\
  !*** ./src/common/guards/roles.guard.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const user_role_enum_1 = __webpack_require__(/*! ../enums/user-role.enum */ "./src/common/enums/user-role.enum.ts");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(exports.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || !requiredRoles.length) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        return this.matchRoles(requiredRoles, user.role);
    }
    matchRoles(requiredRoles, userRole) {
        if (userRole === user_role_enum_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        return requiredRoles.includes(userRole);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);


/***/ }),

/***/ "./src/common/guards/throttle.guard.ts":
/*!*********************************************!*\
  !*** ./src/common/guards/throttle.guard.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomThrottlerGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
let CustomThrottlerGuard = class CustomThrottlerGuard extends throttler_1.ThrottlerGuard {
    getTracker(req) {
        return Promise.resolve(req.ips.length ? req.ips[0] : req.ip);
    }
    async throwThrottlingException() {
        throw new throttler_1.ThrottlerException('Too many requests. Please try again later.');
    }
    async shouldSkip(context) {
        const req = context.switchToHttp().getRequest();
        if (this.isWhitelisted(req) || this.isAdmin(req)) {
            return true;
        }
        return false;
    }
    isWhitelisted(req) {
        const whitelistedIPs = ['127.0.0.1', 'localhost'];
        const clientIP = req.ips.length ? req.ips[0] : req.ip;
        return whitelistedIPs.includes(clientIP);
    }
    isAdmin(req) {
        const user = req.user;
        if (!user)
            return false;
        return ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
    }
};
exports.CustomThrottlerGuard = CustomThrottlerGuard;
exports.CustomThrottlerGuard = CustomThrottlerGuard = __decorate([
    (0, common_1.Injectable)()
], CustomThrottlerGuard);


/***/ }),

/***/ "./src/common/guards/ws-jwt.guard.ts":
/*!*******************************************!*\
  !*** ./src/common/guards/ws-jwt.guard.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WsJwtGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
let WsJwtGuard = class WsJwtGuard {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    canActivate(context) {
        try {
            const client = context.switchToWs().getClient();
            if (client.data.user) {
                return true;
            }
            const token = context.switchToWs().getData()?.token;
            if (!token) {
                throw new websockets_1.WsException('No token provided');
            }
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            client.data.user = payload;
            return true;
        }
        catch (error) {
            throw new websockets_1.WsException('Invalid token');
        }
    }
};
exports.WsJwtGuard = WsJwtGuard;
exports.WsJwtGuard = WsJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], WsJwtGuard);


/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoTransform = exports.NoCache = exports.Public = void 0;
exports.ApiFile = ApiFile;
__exportStar(__webpack_require__(/*! ./guards/roles.guard */ "./src/common/guards/roles.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/throttle.guard */ "./src/common/guards/throttle.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/transform.interceptor */ "./src/common/interceptors/transform.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/logging.interceptor */ "./src/common/interceptors/logging.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/timeout.interceptor */ "./src/common/interceptors/timeout.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/cache.interceptor */ "./src/common/interceptors/cache.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./pipes/validation.pipe */ "./src/common/pipes/validation.pipe.ts"), exports);
__exportStar(__webpack_require__(/*! ./filters/http-exception.filter */ "./src/common/filters/http-exception.filter.ts"), exports);
__exportStar(__webpack_require__(/*! ./enums/user-role.enum */ "./src/common/enums/user-role.enum.ts"), exports);
const Public = () => Reflect.metadata('isPublic', true);
exports.Public = Public;
const NoCache = () => Reflect.metadata('no-cache', true);
exports.NoCache = NoCache;
const NoTransform = () => Reflect.metadata('no-transform', true);
exports.NoTransform = NoTransform;
function ApiFile(fieldName = 'file') {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('swagger/apiFile', { fieldName }, descriptor.value);
        return descriptor;
    };
}


/***/ }),

/***/ "./src/common/interceptors/cache.interceptor.ts":
/*!******************************************************!*\
  !*** ./src/common/interceptors/cache.interceptor.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheInterceptor = exports.CACHE_TTL_METADATA = exports.CACHE_KEY_METADATA = void 0;
exports.CacheKey = CacheKey;
exports.CacheTTL = CacheTTL;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
exports.CACHE_KEY_METADATA = 'cache_key';
exports.CACHE_TTL_METADATA = 'cache_ttl';
let CacheInterceptor = class CacheInterceptor {
    constructor(cacheManager, httpAdapterHost) {
        this.cacheManager = cacheManager;
        this.httpAdapterHost = httpAdapterHost;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
        if (!isGetRequest) {
            return next.handle();
        }
        const cacheKey = this.buildCacheKey(context);
        const ttl = this.getCacheTTL(context);
        try {
            const cachedResponse = await this.cacheManager.get(cacheKey);
            if (cachedResponse) {
                return (0, rxjs_1.of)(cachedResponse);
            }
            return next.handle().pipe((0, operators_1.tap)(response => {
                this.cacheManager.set(cacheKey, response, ttl);
            }));
        }
        catch (error) {
            return next.handle();
        }
    }
    buildCacheKey(context) {
        const request = context.switchToHttp().getRequest();
        const customKey = Reflect.getMetadata(exports.CACHE_KEY_METADATA, context.getHandler());
        if (customKey) {
            return `${customKey}:${this.buildKey(request.url, request.query)}`;
        }
        return this.buildKey(request.url, request.query);
    }
    buildKey(url, query) {
        const queryString = Object.keys(query)
            .sort()
            .map(key => `${key}=${query[key]}`)
            .join('&');
        return queryString ? `${url}?${queryString}` : url;
    }
    getCacheTTL(context) {
        return (Reflect.getMetadata(exports.CACHE_TTL_METADATA, context.getHandler()) ||
            300);
    }
};
exports.CacheInterceptor = CacheInterceptor;
exports.CacheInterceptor = CacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, core_1.HttpAdapterHost])
], CacheInterceptor);
function CacheKey(key) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(exports.CACHE_KEY_METADATA, key, descriptor.value);
        return descriptor;
    };
}
function CacheTTL(ttl) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(exports.CACHE_TTL_METADATA, ttl, descriptor.value);
        return descriptor;
    };
}


/***/ }),

/***/ "./src/common/interceptors/logging.interceptor.ts":
/*!********************************************************!*\
  !*** ./src/common/interceptors/logging.interceptor.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, path: url } = request;
        const className = context.getClass().name;
        const handlerName = context.getHandler().name;
        const userAgent = request.get('user-agent') || '';
        const userId = request.user?.id || 'anonymous';
        const now = Date.now();
        const requestId = this.generateRequestId();
        this.logger.log(`[${requestId}] Incoming ${method} ${url} from ${userId} (${userAgent})`);
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const maskedBody = this.maskSensitiveData(request.body);
            this.logger.debug(`[${requestId}] Request Body: ${JSON.stringify(maskedBody)}`);
        }
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const responseTime = Date.now() - now;
                this.logger.log(`[${requestId}] ${className}.${handlerName} completed in ${responseTime}ms`);
                if (process.env.NODE_ENV === 'development') {
                    const maskedResponse = this.maskSensitiveData(data);
                    this.logger.debug(`[${requestId}] Response: ${JSON.stringify(maskedResponse)}`);
                }
            },
            error: (error) => {
                const responseTime = Date.now() - now;
                this.logger.error(`[${requestId}] ${className}.${handlerName} failed in ${responseTime}ms: ${error.message}`, error.stack);
            },
        }));
    }
    generateRequestId() {
        return Math.random().toString(36).substring(2, 15);
    }
    maskSensitiveData(data) {
        if (!data)
            return data;
        const sensitiveFields = [
            'password',
            'token',
            'secret',
            'authorization',
            'cookie',
            'cardNumber',
            'cvv',
        ];
        const masked = { ...data };
        const maskObject = (obj) => {
            for (const key in obj) {
                if (obj[key] === null || obj[key] === undefined)
                    continue;
                if (typeof obj[key] === 'object') {
                    maskObject(obj[key]);
                }
                else if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
                    obj[key] = '********';
                }
            }
        };
        maskObject(masked);
        return masked;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);


/***/ }),

/***/ "./src/common/interceptors/timeout.interceptor.ts":
/*!********************************************************!*\
  !*** ./src/common/interceptors/timeout.interceptor.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeoutInterceptor = void 0;
exports.SetTimeout = SetTimeout;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let TimeoutInterceptor = class TimeoutInterceptor {
    constructor(timeoutDuration = 30000) {
        this.timeoutDuration = timeoutDuration;
    }
    intercept(context, next) {
        if (this.isWebSocket(context) || this.isLongPolling(context)) {
            return next.handle();
        }
        return next.handle().pipe((0, operators_1.timeout)(this.timeoutDuration), (0, operators_1.catchError)(err => {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(() => new common_1.RequestTimeoutException('Request processing timeout. Please try again.'));
            }
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
    isWebSocket(context) {
        return context.getType() === 'ws';
    }
    isLongPolling(context) {
        const request = context.switchToHttp().getRequest();
        return request?.headers?.['x-long-polling'] === 'true';
    }
};
exports.TimeoutInterceptor = TimeoutInterceptor;
exports.TimeoutInterceptor = TimeoutInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], TimeoutInterceptor);
function SetTimeout(duration) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const result = originalMethod.apply(this, args);
            if (result instanceof Promise) {
                return Promise.race([
                    result,
                    new Promise((_, reject) => {
                        setTimeout(() => {
                            reject(new common_1.RequestTimeoutException('Request processing timeout. Please try again.'));
                        }, duration);
                    }),
                ]);
            }
            return result;
        };
        return descriptor;
    };
}


/***/ }),

/***/ "./src/common/interceptors/transform.interceptor.ts":
/*!**********************************************************!*\
  !*** ./src/common/interceptors/transform.interceptor.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.map)(data => {
            if (data && typeof data === 'object' && 'items' in data && 'meta' in data) {
                return {
                    data: data.items,
                    meta: data.meta,
                    message: this.getDefaultMessage(statusCode, request.method),
                    timestamp: new Date().toISOString(),
                };
            }
            return {
                data,
                message: this.getDefaultMessage(statusCode, request.method),
                timestamp: new Date().toISOString(),
            };
        }));
    }
    getDefaultMessage(statusCode, method) {
        if (statusCode === 201) {
            return 'Resource created successfully';
        }
        switch (method) {
            case 'POST':
                return 'Resource created successfully';
            case 'PUT':
            case 'PATCH':
                return 'Resource updated successfully';
            case 'DELETE':
                return 'Resource deleted successfully';
            default:
                return 'Operation completed successfully';
        }
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ }),

/***/ "./src/common/pipes/validation.pipe.ts":
/*!*********************************************!*\
  !*** ./src/common/pipes/validation.pipe.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationPipe = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Validation failed',
                errors: this.formatErrors(errors),
            });
        }
        return object;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    formatErrors(errors) {
        return errors.reduce((acc, error) => {
            const constraints = error.constraints || {};
            const messages = Object.values(constraints);
            if (error.children && error.children.length > 0) {
                const nestedErrors = this.formatErrors(error.children);
                Object.keys(nestedErrors).forEach(key => {
                    acc[`${error.property}.${key}`] = nestedErrors[key];
                });
            }
            else {
                acc[error.property] = messages;
            }
            return acc;
        }, {});
    }
};
exports.ValidationPipe = ValidationPipe;
exports.ValidationPipe = ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);


/***/ }),

/***/ "./src/config/constants.ts":
/*!*********************************!*\
  !*** ./src/config/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PATTERNS = exports.SUPER_ADMIN_DEFAULTS = exports.FRONTEND_URLS = exports.OTP = exports.RATE_LIMIT = exports.APP = exports.CLOUDINARY = exports.PAYSTACK = exports.BREVO = exports.FILE_UPLOAD = exports.COOKIE = exports.JWT = void 0;
exports.JWT = {
    ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
    REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
};
exports.COOKIE = {
    SECRET: process.env.COOKIE_SECRET,
    OPTIONS: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    },
};
exports.FILE_UPLOAD = {
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
    ALLOWED_FILE_TYPES: (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,pdf,doc,docx').split(','),
    DOCUMENT_TYPES: {
        PASSPORT: 'passport',
        TRANSCRIPT: 'transcript',
        ENGLISH_SCORE: 'english_score',
        OFFER_LETTER: 'offer_letter',
        VISA_DOCUMENT: 'visa_document',
        VERIFICATION_DOC: 'verification_doc',
        TESTIMONIAL_VIDEO: 'testimonial_video',
    },
};
exports.BREVO = {
    API_KEY: process.env.BREVO_API_KEY,
    SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL || 'noreply@sea-faj.com',
    SENDER_NAME: process.env.BREVO_SENDER_NAME || 'SEA-FAJ Consult',
    TEMPLATES: {
        EMAIL_VERIFICATION: parseInt(process.env.EMAIL_VERIFICATION_TEMPLATE_ID || '1') || 1,
        PASSWORD_RESET: parseInt(process.env.PASSWORD_RESET_TEMPLATE_ID || '2') || 2,
        WELCOME: parseInt(process.env.WELCOME_TEMPLATE_ID || '3') || 3,
        APPLICATION_STATUS: parseInt(process.env.APPLICATION_STATUS_TEMPLATE_ID || '4') || 4,
        PAYMENT_CONFIRMATION: parseInt(process.env.PAYMENT_CONFIRMATION_TEMPLATE_ID || '5') || 5,
    },
};
exports.PAYSTACK = {
    SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
    WEBHOOK_SECRET: process.env.PAYSTACK_WEBHOOK_SECRET,
    BASE_URL: 'https://api.paystack.co',
};
exports.CLOUDINARY = {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
    FOLDERS: {
        DOCUMENTS: 'sea-faj/documents',
        PROFILES: 'sea-faj/profiles',
        TESTIMONIALS: 'sea-faj/testimonials',
        VERIFICATION: 'sea-faj/verification',
    },
};
exports.APP = {
    PORT: parseInt(process.env.PORT || '3000'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3001',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3001',
};
exports.RATE_LIMIT = {
    TTL: parseInt(process.env.THROTTLE_TTL || '60'),
    LIMIT: parseInt(process.env.THROTTLE_LIMIT || '10'),
};
exports.OTP = {
    EXPIRY_MINUTES: parseInt(process.env.OTP_EXPIRY_MINUTES || '10'),
    LENGTH: parseInt(process.env.OTP_LENGTH || '6'),
};
exports.FRONTEND_URLS = {
    BASE: process.env.FRONTEND_URL || 'http://localhost:3001',
    STUDENT_PORTAL: process.env.STUDENT_PORTAL_URL || 'http://localhost:3001/student',
    EMPLOYER_PORTAL: process.env.EMPLOYER_PORTAL_URL || 'http://localhost:3001/employer',
    ADMIN_PORTAL: process.env.ADMIN_PORTAL_URL || 'http://localhost:3001/admin',
};
exports.SUPER_ADMIN_DEFAULTS = {
    EMAIL: process.env.SUPER_ADMIN_EMAIL || 'admin@sea-faj.com',
    PASSWORD: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!',
    FIRST_NAME: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
    LAST_NAME: process.env.SUPER_ADMIN_LAST_NAME || 'Admin',
};
exports.PATTERNS = {
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    APPLICATION_ID: /^SEA-\d{6}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};


/***/ }),

/***/ "./src/config/jwt.config.ts":
/*!**********************************!*\
  !*** ./src/config/jwt.config.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtConfig = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtConfig = class JwtConfig {
    constructor(configService) {
        this.configService = configService;
    }
    createJwtOptions() {
        return {
            secret: this.configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
            },
        };
    }
    getRefreshTokenOptions() {
        return {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        };
    }
    getCookieOptions() {
        return {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
    }
};
exports.JwtConfig = JwtConfig;
exports.JwtConfig = JwtConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtConfig);


/***/ }),

/***/ "./src/payments/dto/index.ts":
/*!***********************************!*\
  !*** ./src/payments/dto/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./initialize-payment.dto */ "./src/payments/dto/initialize-payment.dto.ts"), exports);


/***/ }),

/***/ "./src/payments/dto/initialize-payment.dto.ts":
/*!****************************************************!*\
  !*** ./src/payments/dto/initialize-payment.dto.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyPaymentDto = exports.InitializePaymentDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class InitializePaymentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { amount: { required: true, type: () => Number, minimum: 1 }, type: { required: true, type: () => String, enum: ['service_fee', 'recruitment_fee', 'subscription_fee'] }, metadata: { required: false, type: () => Object } };
    }
}
exports.InitializePaymentDto = InitializePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000, description: 'Amount in Naira' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], InitializePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'service_fee',
        description: 'Type of payment',
        enum: ['service_fee', 'recruitment_fee', 'subscription_fee']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['service_fee', 'recruitment_fee', 'subscription_fee']),
    __metadata("design:type", String)
], InitializePaymentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { description: 'University application fee' },
        required: false,
        description: 'Additional metadata for the payment'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], InitializePaymentDto.prototype, "metadata", void 0);
class VerifyPaymentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { reference: { required: true, type: () => String } };
    }
}
exports.VerifyPaymentDto = VerifyPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SEA_1234567890_ABC123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyPaymentDto.prototype, "reference", void 0);


/***/ }),

/***/ "./src/payments/payments.controller.ts":
/*!*********************************************!*\
  !*** ./src/payments/payments.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const paystack_service_1 = __webpack_require__(/*! ./paystack.service */ "./src/payments/paystack.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../common/guards/roles.guard */ "./src/common/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../common/decorators/roles.decorator */ "./src/common/decorators/roles.decorator.ts");
const types_1 = __webpack_require__(/*! ../prisma/types */ "./src/prisma/types/index.ts");
const dto_1 = __webpack_require__(/*! ./dto */ "./src/payments/dto/index.ts");
let PaymentsController = class PaymentsController {
    constructor(paystackService) {
        this.paystackService = paystackService;
    }
    async initializePayment(initializePaymentDto, req) {
        const { amount, type, metadata } = initializePaymentDto;
        const user = req.user;
        return this.paystackService.initializePayment(user.email, amount, type, user.id, metadata);
    }
    async verifyPayment(reference) {
        return this.paystackService.verifyPayment(reference);
    }
    async getPaymentHistory(req) {
        const user = req.user;
        const userType = user.role === types_1.UserRole.STUDENT ? 'student' : 'employer';
        return this.paystackService.getPaymentHistory(user.id, userType);
    }
    async getAllPayments(page = '1', limit = '10', status, type) {
        return {
            message: 'Admin payment management endpoint',
            filters: { page, limit, status, type },
        };
    }
    async test() {
        return {
            message: 'Payments module is working correctly',
            timestamp: new Date().toISOString(),
            endpoints: [
                'POST /payments/initialize',
                'POST /payments/verify/:reference',
                'GET /payments/history',
                'GET /payments/admin/all',
            ],
        };
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('initialize'),
    (0, swagger_1.ApiOperation)({ summary: 'Initialize a payment transaction' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payment initialized successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid payment data' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.InitializePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initializePayment", null);
__decorate([
    (0, common_1.Post)('verify/:reference'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a payment transaction' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Payment verification failed' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment history for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment history retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentHistory", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All payments retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test payments module' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payments module is working' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "test", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [paystack_service_1.PaystackService])
], PaymentsController);


/***/ }),

/***/ "./src/payments/payments.module.ts":
/*!*****************************************!*\
  !*** ./src/payments/payments.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const payments_controller_1 = __webpack_require__(/*! ./payments.controller */ "./src/payments/payments.controller.ts");
const webhook_controller_1 = __webpack_require__(/*! ./webhook.controller */ "./src/payments/webhook.controller.ts");
const paystack_service_1 = __webpack_require__(/*! ./paystack.service */ "./src/payments/paystack.service.ts");
const email_1 = __webpack_require__(/*! ../utils/email */ "./src/utils/email.ts");
const encryption_1 = __webpack_require__(/*! ../utils/encryption */ "./src/utils/encryption.ts");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [payments_controller_1.PaymentsController, webhook_controller_1.WebhookController],
        providers: [paystack_service_1.PaystackService, email_1.EmailService, encryption_1.EncryptionService],
        exports: [paystack_service_1.PaystackService],
    })
], PaymentsModule);


/***/ }),

/***/ "./src/payments/paystack.service.ts":
/*!******************************************!*\
  !*** ./src/payments/paystack.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaystackService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaystackService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./src/prisma/prisma.service.ts");
const email_1 = __webpack_require__(/*! ../utils/email */ "./src/utils/email.ts");
const encryption_1 = __webpack_require__(/*! ../utils/encryption */ "./src/utils/encryption.ts");
const constants_1 = __webpack_require__(/*! ../config/constants */ "./src/config/constants.ts");
const axios_1 = __webpack_require__(/*! axios */ "axios");
let PaystackService = PaystackService_1 = class PaystackService {
    constructor(configService, prisma, emailService, encryptionService) {
        this.configService = configService;
        this.prisma = prisma;
        this.emailService = emailService;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger(PaystackService_1.name);
        this.baseUrl = constants_1.PAYSTACK.BASE_URL;
        this.secretKey = constants_1.PAYSTACK.SECRET_KEY;
    }
    async initializePayment(email, amount, type, userId, metadata) {
        try {
            const reference = this.generateReference();
            await this.prisma.payment.create({
                data: {
                    amount,
                    currency: 'NGN',
                    status: 'PENDING',
                    type,
                    reference,
                    ...(type === 'service_fee' ? { studentId: userId } : {}),
                    ...(type === 'recruitment_fee' ? { employerId: userId } : {}),
                    metadata: metadata || {},
                },
            });
            const payload = {
                email,
                amount: amount * 100,
                reference,
                callback_url: `${this.configService.get('FRONTEND_URL')}/payment/callback`,
                metadata: {
                    userId,
                    type,
                    ...metadata,
                },
            };
            const response = await axios_1.default.post(`${this.baseUrl}/transaction/initialize`, payload, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.data.status) {
                throw new common_1.BadRequestException('Failed to initialize payment');
            }
            this.logger.log(`Payment initialized: ${reference}`);
            return response.data;
        }
        catch (error) {
            this.logger.error('Payment initialization failed:', error);
            throw new common_1.BadRequestException('Failed to initialize payment');
        }
    }
    async verifyPayment(reference) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            if (!response.data.status) {
                throw new common_1.BadRequestException('Payment verification failed');
            }
            const payment = await this.prisma.payment.findUnique({
                where: { reference },
                include: {
                    student: {
                        include: { user: true },
                    },
                    employer: {
                        include: { user: true },
                    },
                },
            });
            if (!payment) {
                throw new common_1.BadRequestException('Payment record not found');
            }
            const verificationData = response.data.data;
            if (verificationData.status === 'success') {
                await this.prisma.payment.update({
                    where: { reference },
                    data: {
                        status: 'COMPLETED',
                        paymentDate: new Date(verificationData.paid_at),
                        metadata: {
                            ...(payment.metadata || {}),
                            paystack_data: verificationData,
                        },
                    },
                });
                const user = payment.student?.user || payment.employer?.user;
                if (user) {
                    const name = payment.student
                        ? `${payment.student.firstName} ${payment.student.lastName}`
                        : payment.employer?.companyName || 'User';
                    await this.emailService.sendPaymentConfirmationEmail(user.email, name, payment.amount, reference);
                }
                this.logger.log(`Payment verified successfully: ${reference}`);
            }
            else {
                await this.prisma.payment.update({
                    where: { reference },
                    data: {
                        status: 'FAILED',
                        metadata: {
                            ...(payment.metadata || {}),
                            paystack_data: verificationData,
                        },
                    },
                });
                this.logger.warn(`Payment failed: ${reference}`);
            }
            return response.data;
        }
        catch (error) {
            this.logger.error('Payment verification failed:', error);
            throw new common_1.BadRequestException('Payment verification failed');
        }
    }
    async handleWebhook(payload, signature) {
        try {
            const isValidSignature = this.encryptionService.verifyHmac(JSON.stringify(payload), signature, constants_1.PAYSTACK.WEBHOOK_SECRET || '');
            if (!isValidSignature) {
                throw new common_1.BadRequestException('Invalid webhook signature');
            }
            const { event, data } = payload;
            switch (event) {
                case 'charge.success':
                    await this.handleSuccessfulCharge(data);
                    break;
                case 'charge.failed':
                    await this.handleFailedCharge(data);
                    break;
                default:
                    this.logger.log(`Unhandled webhook event: ${event}`);
            }
        }
        catch (error) {
            this.logger.error('Webhook handling failed:', error);
            throw error;
        }
    }
    async getPaymentHistory(userId, userType) {
        const whereClause = userType === 'student'
            ? { studentId: userId }
            : { employerId: userId };
        return this.prisma.payment.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                amount: true,
                currency: true,
                status: true,
                type: true,
                reference: true,
                paymentDate: true,
                createdAt: true,
            },
        });
    }
    generateReference() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `SEA_${timestamp}_${random}`.toUpperCase();
    }
    async handleSuccessfulCharge(data) {
        const { reference } = data;
        const payment = await this.prisma.payment.findUnique({
            where: { reference },
        });
        if (payment && payment.status === 'PENDING') {
            await this.prisma.payment.update({
                where: { reference },
                data: {
                    status: 'COMPLETED',
                    paymentDate: new Date(data.paid_at),
                    metadata: {
                        ...(payment.metadata || {}),
                        webhook_data: data,
                    },
                },
            });
            this.logger.log(`Payment completed via webhook: ${reference}`);
        }
    }
    async handleFailedCharge(data) {
        const { reference } = data;
        const payment = await this.prisma.payment.findUnique({
            where: { reference },
        });
        if (payment && payment.status === 'PENDING') {
            await this.prisma.payment.update({
                where: { reference },
                data: {
                    status: 'FAILED',
                    metadata: {
                        ...(payment.metadata || {}),
                        webhook_data: data,
                    },
                },
            });
            this.logger.log(`Payment failed via webhook: ${reference}`);
        }
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = PaystackService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        email_1.EmailService,
        encryption_1.EncryptionService])
], PaystackService);


/***/ }),

/***/ "./src/payments/webhook.controller.ts":
/*!********************************************!*\
  !*** ./src/payments/webhook.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WebhookController_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const paystack_service_1 = __webpack_require__(/*! ./paystack.service */ "./src/payments/paystack.service.ts");
const common_2 = __webpack_require__(/*! ../common */ "./src/common/index.ts");
let WebhookController = WebhookController_1 = class WebhookController {
    constructor(paystackService) {
        this.paystackService = paystackService;
        this.logger = new common_1.Logger(WebhookController_1.name);
    }
    async handlePaystackWebhook(payload, signature) {
        try {
            if (!signature) {
                throw new common_1.BadRequestException('Missing webhook signature');
            }
            await this.paystackService.handleWebhook(payload, signature);
            this.logger.log('Paystack webhook processed successfully');
            return { message: 'Webhook processed successfully' };
        }
        catch (error) {
            this.logger.error('Webhook processing failed:', error);
            throw error;
        }
    }
    async testWebhook() {
        return {
            message: 'Webhook endpoint is working',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('paystack'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Handle Paystack webhook events' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook processed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid webhook signature or payload' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-paystack-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handlePaystackWebhook", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)('test'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Test webhook endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook test successful' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "testWebhook", null);
exports.WebhookController = WebhookController = WebhookController_1 = __decorate([
    (0, swagger_1.ApiTags)('Webhooks'),
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [paystack_service_1.PaystackService])
], WebhookController);


/***/ }),

/***/ "./src/prisma/prisma.module.ts":
/*!*************************************!*\
  !*** ./src/prisma/prisma.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./src/prisma/prisma.service.ts");
const prisma_transaction_1 = __webpack_require__(/*! ./prisma.transaction */ "./src/prisma/prisma.transaction.ts");
let PrismaModule = class PrismaModule {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async onModuleInit() {
        await this.prismaService.$connect();
        this.prismaService.$use(async (params, next) => {
            if (params.action === 'delete') {
                params.action = 'update';
                params.args['data'] = { deletedAt: new Date() };
            }
            if (params.action === 'deleteMany') {
                params.action = 'updateMany';
                if (params.args.data !== undefined) {
                    params.args.data['deletedAt'] = new Date();
                }
                else {
                    params.args['data'] = { deletedAt: new Date() };
                }
            }
            if (params.action === 'findUnique' || params.action === 'findFirst') {
                params.action = 'findFirst';
                params.args.where = {
                    ...params.args.where,
                    deletedAt: null,
                };
            }
            if (params.action === 'findMany') {
                if (params.args.where) {
                    if (params.args.where.deletedAt === undefined) {
                        params.args.where.deletedAt = null;
                    }
                }
                else {
                    params.args['where'] = { deletedAt: null };
                }
            }
            return next(params);
        });
        this.prismaService.$use(async (params, next) => {
            if (params.action === 'create' || params.action === 'createMany') {
                params.args.data = {
                    ...params.args.data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            }
            if (params.action === 'update' || params.action === 'updateMany') {
                params.args.data = {
                    ...params.args.data,
                    updatedAt: new Date(),
                };
            }
            return next(params);
        });
    }
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService, prisma_transaction_1.PrismaTransaction],
        exports: [prisma_service_1.PrismaService, prisma_transaction_1.PrismaTransaction],
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaModule);


/***/ }),

/***/ "./src/prisma/prisma.service.ts":
/*!**************************************!*\
  !*** ./src/prisma/prisma.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('cleanDatabase cannot be run in production');
        }
        const deletePromises = [];
        deletePromises.push(this.chatMessage.deleteMany());
        deletePromises.push(this.document.deleteMany());
        deletePromises.push(this.notification.deleteMany());
        deletePromises.push(this.testimonial.deleteMany());
        deletePromises.push(this.universityOffer.deleteMany());
        deletePromises.push(this.visaApplication.deleteMany());
        deletePromises.push(this.application.deleteMany());
        deletePromises.push(this.payment.deleteMany());
        deletePromises.push(this.recruitmentRequest.deleteMany());
        deletePromises.push(this.jobPosting.deleteMany());
        deletePromises.push(this.student.deleteMany());
        deletePromises.push(this.employer.deleteMany());
        deletePromises.push(this.admin.deleteMany());
        deletePromises.push(this.superAdmin.deleteMany());
        deletePromises.push(this.user.deleteMany());
        return Promise.all(deletePromises);
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ }),

/***/ "./src/prisma/prisma.transaction.ts":
/*!******************************************!*\
  !*** ./src/prisma/prisma.transaction.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaTransaction = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./src/prisma/prisma.service.ts");
let PrismaTransaction = class PrismaTransaction {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async transaction(operations) {
        return this.prisma.$transaction(async (prisma) => {
            return operations(prisma);
        });
    }
    async interactiveTransaction(operations) {
        return this.prisma.$transaction(async (prisma) => {
            let committed = false;
            let rolledBack = false;
            const commit = async () => {
                committed = true;
            };
            const rollback = async () => {
                rolledBack = true;
                throw new Error('Transaction rolled back');
            };
            try {
                const result = await operations({ prisma, commit, rollback });
                if (rolledBack) {
                    throw new Error('Transaction was rolled back');
                }
                if (!committed) {
                    throw new Error('Transaction was not committed');
                }
                return result;
            }
            catch (error) {
                if (!rolledBack) {
                    throw error;
                }
                throw new Error('Transaction was rolled back: ' + error.message);
            }
        });
    }
};
exports.PrismaTransaction = PrismaTransaction;
exports.PrismaTransaction = PrismaTransaction = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTransaction);


/***/ }),

/***/ "./src/prisma/types/index.ts":
/*!***********************************!*\
  !*** ./src/prisma/types/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSuperAdmin = exports.isAdmin = exports.isEmployer = exports.isStudent = exports.VisaStatus = exports.PaymentStatus = exports.ApplicationStatus = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["EMPLOYER"] = "EMPLOYER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["PENDING"] = "PENDING";
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["SUSPENDED"] = "SUSPENDED";
    UserStatus["INACTIVE"] = "INACTIVE";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["PENDING"] = "PENDING";
    ApplicationStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ApplicationStatus["COMPLETED"] = "COMPLETED";
    ApplicationStatus["REJECTED"] = "REJECTED";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PROCESSING"] = "PROCESSING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var VisaStatus;
(function (VisaStatus) {
    VisaStatus["NOT_STARTED"] = "NOT_STARTED";
    VisaStatus["DOCUMENTS_SUBMITTED"] = "DOCUMENTS_SUBMITTED";
    VisaStatus["APPOINTMENT_SCHEDULED"] = "APPOINTMENT_SCHEDULED";
    VisaStatus["INTERVIEW_COMPLETED"] = "INTERVIEW_COMPLETED";
    VisaStatus["VISA_GRANTED"] = "VISA_GRANTED";
    VisaStatus["VISA_REJECTED"] = "VISA_REJECTED";
})(VisaStatus || (exports.VisaStatus = VisaStatus = {}));
const isStudent = (user) => {
    return user.role === UserRole.STUDENT && user.student !== null;
};
exports.isStudent = isStudent;
const isEmployer = (user) => {
    return user.role === UserRole.EMPLOYER && user.employer !== null;
};
exports.isEmployer = isEmployer;
const isAdmin = (user) => {
    return user.role === UserRole.ADMIN && user.admin !== null;
};
exports.isAdmin = isAdmin;
const isSuperAdmin = (user) => {
    return user.role === UserRole.SUPER_ADMIN && user.superAdmin !== null;
};
exports.isSuperAdmin = isSuperAdmin;


/***/ }),

/***/ "./src/users/users.module.ts":
/*!***********************************!*\
  !*** ./src/users/users.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], UsersModule);


/***/ }),

/***/ "./src/utils/email.ts":
/*!****************************!*\
  !*** ./src/utils/email.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const constants_1 = __webpack_require__(/*! ../config/constants */ "./src/config/constants.ts");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    async sendEmail(to, subject, htmlContent, templateId) {
        try {
            this.logger.log(`📧 Email would be sent to: ${to}`);
            this.logger.log(`📧 Subject: ${subject}`);
            this.logger.log(`📧 Template ID: ${templateId || 'None'}`);
            return Promise.resolve();
        }
        catch (error) {
            this.logger.error('Email sending failed:', error);
            throw new Error('Failed to send email');
        }
    }
    async sendVerificationEmail(email, otp) {
        const subject = 'Email Verification - SEA-FAJ Portal';
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Email Verification</h2>
        <p>Thank you for registering with SEA-FAJ Consult!</p>
        <p>Your verification code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;
        await this.sendEmail(email, subject, htmlContent, constants_1.BREVO.TEMPLATES.EMAIL_VERIFICATION);
    }
    async sendPasswordResetEmail(email, otp) {
        const subject = 'Password Reset - SEA-FAJ Portal';
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Your password reset code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #dc3545; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;
        await this.sendEmail(email, subject, htmlContent, constants_1.BREVO.TEMPLATES.PASSWORD_RESET);
    }
    async sendWelcomeEmail(email, name, applicationId) {
        const subject = 'Welcome to SEA-FAJ Consult!';
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Welcome to SEA-FAJ Consult!</h2>
        <p>Dear ${name},</p>
        <p>Welcome to SEA-FAJ Consult! We're excited to help you on your journey.</p>
        ${applicationId ? `
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">Your Application ID</h3>
            <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">${applicationId}</p>
            <p style="font-size: 14px; color: #6c757d;">Please keep this ID safe for future reference.</p>
          </div>
        ` : ''}
        <p>You can now access your portal and start your application process.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;
        await this.sendEmail(email, subject, htmlContent, constants_1.BREVO.TEMPLATES.WELCOME);
    }
    async sendApplicationStatusEmail(email, name, status, applicationId) {
        const subject = `Application Status Update - ${applicationId}`;
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Application Status Update</h2>
        <p>Dear ${name},</p>
        <p>Your application <strong>${applicationId}</strong> status has been updated.</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">New Status</h3>
          <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">${status}</p>
        </div>
        <p>Please log in to your portal to view more details.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;
        await this.sendEmail(email, subject, htmlContent, constants_1.BREVO.TEMPLATES.APPLICATION_STATUS);
    }
    async sendPaymentConfirmationEmail(email, name, amount, reference) {
        const subject = `Payment Confirmation - ${reference}`;
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Payment Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Your payment has been successfully processed.</p>
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">Payment Details</h3>
          <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p>Thank you for your payment. You can view your receipt in your portal.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;
        await this.sendEmail(email, subject, htmlContent, constants_1.BREVO.TEMPLATES.PAYMENT_CONFIRMATION);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);


/***/ }),

/***/ "./src/utils/encryption.ts":
/*!*********************************!*\
  !*** ./src/utils/encryption.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptionService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto = __webpack_require__(/*! crypto */ "crypto");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
let EncryptionService = class EncryptionService {
    constructor() {
        this.algorithm = 'aes-256-gcm';
        this.secretKey = process.env.ENCRYPTION_SECRET || 'default-secret-key-32-characters-long';
    }
    generateToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
    generateSecureString(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    async hashPassword(password, saltRounds = 12) {
        return bcrypt.hash(password, saltRounds);
    }
    async verifyPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    createHash(data, algorithm = 'sha256') {
        return crypto.createHash(algorithm).update(data).digest('hex');
    }
    createHmac(data, secret, algorithm = 'sha256') {
        return crypto.createHmac(algorithm, secret).update(data).digest('hex');
    }
    verifyHmac(data, signature, secret, algorithm = 'sha256') {
        const expectedSignature = this.createHmac(data, secret, algorithm);
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    }
    generateApplicationId() {
        const numeric = Math.floor(100000 + Math.random() * 900000);
        return `SEA-${numeric}`;
    }
    generateReferralCode(prefix) {
        const code = this.generateSecureString(8).toUpperCase();
        return prefix ? `${prefix}-${code}` : code;
    }
    encryptData(data) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey.slice(0, 32)), iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    }
    decryptData(encryptedData) {
        const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey.slice(0, 32)), iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)()
], EncryptionService);


/***/ }),

/***/ "./src/utils/otp.ts":
/*!**************************!*\
  !*** ./src/utils/otp.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const constants_1 = __webpack_require__(/*! ../config/constants */ "./src/config/constants.ts");
let OtpService = class OtpService {
    constructor() {
        this.otpStorage = new Map();
    }
    generateOtp(length = constants_1.OTP.LENGTH) {
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += (0, crypto_1.randomInt)(0, 10).toString();
        }
        return otp;
    }
    async storeOtp(email, otp, expiryMinutes = constants_1.OTP.EXPIRY_MINUTES) {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
        this.otpStorage.set(email, { otp, expiresAt });
    }
    async verifyOtp(email, providedOtp) {
        const otpData = this.otpStorage.get(email);
        if (!otpData) {
            return false;
        }
        if (new Date() > otpData.expiresAt) {
            this.otpStorage.delete(email);
            return false;
        }
        if (otpData.otp !== providedOtp) {
            return false;
        }
        this.otpStorage.delete(email);
        return true;
    }
    async clearOtp(email) {
        this.otpStorage.delete(email);
    }
    cleanupExpiredOtps() {
        const now = new Date();
        for (const [email, otpData] of this.otpStorage.entries()) {
            if (now > otpData.expiresAt) {
                this.otpStorage.delete(email);
            }
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)()
], OtpService);


/***/ }),

/***/ "@nestjs/cache-manager":
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "@prisma/client/runtime/library":
/*!*************************************************!*\
  !*** external "@prisma/client/runtime/library" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/library");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const helmet_1 = __webpack_require__(/*! helmet */ "helmet");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common/index.ts");
const constants_1 = __webpack_require__(/*! ./config/constants */ "./src/config/constants.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.use((0, helmet_1.default)());
    app.use(cookieParser(constants_1.COOKIE.SECRET));
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3001'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-paystack-signature'],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new common_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new common_1.TransformInterceptor(), new common_1.LoggingInterceptor(), new common_1.TimeoutInterceptor());
    if (process.env.NODE_ENV !== 'production') {
        const baseConfig = new swagger_1.DocumentBuilder()
            .setTitle('SEA-FAJ Portal API')
            .setDescription('API documentation for SEA-FAJ Student & Employer Portal')
            .setVersion('1.0')
            .addBearerAuth()
            .addCookieAuth('Authentication')
            .addServer('http://localhost:3000', 'Local environment')
            .addServer('https://api.sea-faj.com', 'Production environment');
        const studentConfig = baseConfig
            .setTitle('SEA-FAJ Student API')
            .addTag('Authentication', 'Student authentication endpoints')
            .addTag('Profile', 'Student profile management')
            .addTag('Applications', 'Student application management')
            .addTag('Documents', 'Document management')
            .addTag('Payments', 'Payment management')
            .build();
        const studentDocument = swagger_1.SwaggerModule.createDocument(app, studentConfig);
        swagger_1.SwaggerModule.setup('docs/student', app, studentDocument);
        const employerConfig = baseConfig
            .setTitle('SEA-FAJ Employer API')
            .addTag('Authentication', 'Employer authentication endpoints')
            .addTag('Profile', 'Employer profile management')
            .addTag('Recruitment', 'Recruitment management')
            .addTag('Payments', 'Payment management')
            .build();
        const employerDocument = swagger_1.SwaggerModule.createDocument(app, employerConfig);
        swagger_1.SwaggerModule.setup('docs/employer', app, employerDocument);
        const adminConfig = baseConfig
            .setTitle('SEA-FAJ Admin API')
            .addTag('Authentication', 'Admin authentication endpoints')
            .addTag('Students', 'Student management')
            .addTag('Employers', 'Employer management')
            .addTag('Applications', 'Application management')
            .addTag('Payments', 'Payment management')
            .addTag('System', 'System management')
            .build();
        const adminDocument = swagger_1.SwaggerModule.createDocument(app, adminConfig);
        swagger_1.SwaggerModule.setup('docs/admin', app, adminDocument);
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

})();

/******/ })()
;