import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { WsJwtGuard } from '../common/guards/ws-jwt.guard';
import { JwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, WsJwtGuard],
  exports: [ChatService, ChatGateway],
})
export class ChatModule {}
