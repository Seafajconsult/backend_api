import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PaymentsModule } from './payments/payments.module';
import { ApplicationModule } from './application/application.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.THROTTLE_TTL || '60'),
      limit: parseInt(process.env.THROTTLE_LIMIT || '10'),
    }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ChatModule,
    PaymentsModule,
    ApplicationModule,
  ],
})
export class AppModule {}
