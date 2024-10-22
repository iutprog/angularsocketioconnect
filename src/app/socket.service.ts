import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  
  constructor() {
    // Connect to the backend Socket.IO server
    this.socket = io('http://localhost:3000');  // Change the URL if needed
  }

  // Emit a message to the server
  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  // Listen for messages from the server
  getMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
}