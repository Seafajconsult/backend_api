import { Global, Module, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTransaction } from './prisma.transaction';

@Global()
@Module({
  providers: [PrismaService, PrismaTransaction],
  exports: [PrismaService, PrismaTransaction],
})
export class PrismaModule implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    // Connect to the database when the module initializes
    await this.prismaService.$connect();

    // Add middleware for soft deletes if needed
    this.prismaService.$use(async (params: any, next: any) => {
      // Check for delete operations
      if (params.action === 'delete') {
        // Change action to update
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }
      if (params.action === 'deleteMany') {
        // Change action to updateMany
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }

      // Add filter for soft deleted records on find operations
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Change to findFirst - you cannot filter on non-indexed fields using findUnique
        params.action = 'findFirst';
        // Add 'deletedAt' filter
        params.args.where = {
          ...params.args.where,
          deletedAt: null,
        };
      }
      if (params.action === 'findMany') {
        // Add 'deletedAt' filter
        if (params.args.where) {
          if (params.args.where.deletedAt === undefined) {
            // Exclude deleted records if deletedAt is not explicitly set
            params.args.where.deletedAt = null;
          }
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }

      return next(params);
    });

    // Add middleware for timestamps
    this.prismaService.$use(async (params: any, next: any) => {
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
}
