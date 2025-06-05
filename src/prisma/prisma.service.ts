import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
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

    // Delete in order of dependencies (children first)
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
}
