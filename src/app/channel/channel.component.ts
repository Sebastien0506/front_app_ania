import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelServiceService, Message } from './channel-service.service';
import { NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {

  messages: Message[] = [];
  channelId!: string;
  private socket!: WebSocket;

  constructor(
    private channelService: ChannelServiceService,
    private route: ActivatedRoute
  ) {}

  loadMessage() {
    this.channelService.getMessage(this.channelId).subscribe(data => {
      this.messages = data;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (!id) return;

      this.channelId = id;

      // 🔥 Ferme ancien socket si existe
      if (this.socket) {
        this.socket.close();
      }

      this.loadMessage();

      this.socket = new WebSocket(
        `ws://localhost:8000/ws/channel/${this.channelId}/`
      );

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.messages.push(message);
      };
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
