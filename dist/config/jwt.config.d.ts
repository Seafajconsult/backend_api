import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
export declare class JwtConfig implements JwtOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createJwtOptions(): JwtModuleOptions;
    getRefreshTokenOptions(): {
        secret: string | undefined;
        expiresIn: string;
    };
    getCookieOptions(): {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "strict";
        path: string;
        maxAge: number;
    };
}
