import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private connectedUsers = new Map<string, string>();

  constructor(
    private messageService: MessagesService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;
      const payload = this.jwtService.verify<any>(token);

      this.connectedUsers.set(client.id, payload.sub);
      console.log(
        `User ${payload.sub} connected with the socket id ${client.id}`,
      );
    } catch (error) {
      console.log(`Connection error`, error.message);
      client.disconnect();
    }
  }
  async handleDisconnect(client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      this.connectedUsers.delete(client.id);
      console.log(
        `User ${userId} disconnected with the socket id ${client.id}`,
      );
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { chatId: string; content: string },
  ) {
    const senderId = this.connectedUsers.get(client.id);
    const message = await this.messageService.create(
      senderId,
      payload.chatId,
      payload.content,
    );
    this.server.to(payload.chatId).emit('message', message);
  }

  @SubscribeMessage('readMessage')
  async handleReadMessage(
    client: Socket,
    payload: { chatId: string; userId: string },
  ) {
    await this.messageService.markMessageAsRead(payload.userId, payload.chatId);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, chatId: string) {
    client.join(chatId);
    console.log(
      `User ${this.connectedUsers.get(client.id)} joined chat ${chatId}`,
    );
  }
  @SubscribeMessage('leaveChat')
  async handleLeaveChat(client: Socket, chatId: string) {
    client.leave(chatId);
    console.log(
      `User ${this.connectedUsers.get(client.id)} left chat ${chatId}`,
    );
  }
}
