import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  jsonHeaders = new HttpHeaders({ "Content-Type": "application/json"});
  roomId: any = null;
  personId: any = null;

  constructor(
    private httpClient: HttpClient
  ) { }


  
  public enterSession(sessionInfo: any){
    return this.httpClient.post(
      `/api/joinSession/`,
      JSON.stringify(sessionInfo),
      {headers:this.jsonHeaders}
    )
  }
  
  public getMessages(){
    const t = this;
    return this.httpClient.get(
      `/api/messages?roomId=${t.roomId}&personId=${t.personId}`,
      {headers:this.jsonHeaders}
    )
  }

  public sendMessage(message:Message){
    return this.httpClient.post(
      `/api/message`,
      JSON.stringify({
        roomId: this.roomId,
        personId: this.personId,
        message: message
      }),
      {headers:this.jsonHeaders}
    )
  }
}
