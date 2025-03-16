import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  constructor() {
    this.socket = io(environment.BASE_URL, {
      transports: ['websocket', 'polling'], // Ensures WebSocket fallback
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.socket.on('message', (message: string) => {
      this.messageSubject.next(message);
    });
  }

  sendMessage(message: string) {
    this.socket.emit('sendMessage', message);
  }

  disconnect() {
    this.socket.disconnect();
    console.log('Socket disconnected!');
  }
}
