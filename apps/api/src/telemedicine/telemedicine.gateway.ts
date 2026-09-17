import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/telemedicine' })
export class TelemedicineGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private readonly logger = new Logger(TelemedicineGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected to telemedicine: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected from telemedicine: ${client.id}`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() data: { encounterId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.encounterId);
    this.logger.log(`Client ${client.id} joined telemedicine room ${data.encounterId}`);
    client.to(data.encounterId).emit('user-joined', { socketId: client.id });
  }

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: { encounterId: string; offer: any }, @ConnectedSocket() client: Socket) {
    client.to(data.encounterId).emit('offer', { offer: data.offer, senderId: client.id });
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: { encounterId: string; answer: any }, @ConnectedSocket() client: Socket) {
    client.to(data.encounterId).emit('answer', { answer: data.answer, senderId: client.id });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: { encounterId: string; candidate: any }, @ConnectedSocket() client: Socket) {
    client.to(data.encounterId).emit('ice-candidate', { candidate: data.candidate, senderId: client.id });
  }
}
