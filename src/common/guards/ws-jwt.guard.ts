import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const client: Socket = context.switchToWs().getClient();
      
      // Check if user is already authenticated from connection
      if (client.data.user) {
        return true;
      }

      // If not, try to authenticate from token in message
      const token = context.switchToWs().getData()?.token;
      
      if (!token) {
        throw new WsException('No token provided');
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // You could add additional user verification here
      client.data.user = payload;
      
      return true;
    } catch (error) {
      throw new WsException('Invalid token');
    }
  }
}
