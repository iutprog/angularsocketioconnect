import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  message: string = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Listen for incoming messages
    this.socketService.getMessage().subscribe((msg: string) => {
      this.messages.push(msg);
    });
  }

  // Send a message to the server
  sendMessage(): void {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
