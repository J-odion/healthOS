import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected to QueueBoard: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected from QueueBoard: ${client.id}`);
  }

  broadcastQueueUpdate(queueItem: any) {
    this.server.emit('queueUpdate', queueItem);
  }
}
