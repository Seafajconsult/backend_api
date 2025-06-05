import { ConfigService } from '@nestjs/config';
export declare class BrevoConfig {
    private configService;
    constructor(configService: ConfigService);
    getSenderInfo(): {
        email: string | undefined;
        name: string | undefined;
    };
    getTemplateIds(): {
        emailVerification: number;
        passwordReset: number;
        welcome: number;
        applicationStatus: number;
        paymentConfirmation: number;
    };
    getApiKey(): string;
}
