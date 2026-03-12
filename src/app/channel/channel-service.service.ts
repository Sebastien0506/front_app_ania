import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Message{
  author: string;
  content: string;
  created_at: Date;
}
@Injectable({
  providedIn: 'root'
})
export class ChannelServiceService {

  constructor(private http: HttpClient) { }

  // getChannel(guildId: number) {
  //   return this.http.get(
  //     `http://localhost:8000/api/channels/?guild_id=${guildId}`,
  //     {withCredentials: true}
  //   );
  // }

  getMessage(channelId: string) {
    return this.http.get<Message[]>(
      `http://localhost:8000/api/get_message/${channelId}`,
      {withCredentials: true}
    )
  }


}
