import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
export declare class PrismaTransaction {
    private prisma;
    constructor(prisma: PrismaService);
    transaction<T>(operations: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T>;
    interactiveTransaction<T>(operations: (tx: {
        prisma: Prisma.TransactionClient;
        commit: () => Promise<void>;
        rollback: () => Promise<void>;
    }) => Promise<T>): Promise<T>;
}
