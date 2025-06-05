import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
export declare class PrismaModule implements OnModuleInit {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    onModuleInit(): Promise<void>;
}
