import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { map, tap, takeUntil} from 'rxjs/operators';
import { Message } from '../../models/message.model';
import { MessengerService } from '../../services/messenger.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private unsubscribeAll$: Subject<any> = new Subject<any>();
  private pollingInterval$ = interval(1200);
  public messagesPolling$ = new BehaviorSubject<boolean>(false);
  roomId: any;
  personId: any;
  messageText = new FormControl('',[Validators.required]);
  messages: Message[] = [];

  constructor(
    private messenger: MessengerService,
    private router: Router
  ) {
    this.roomId = messenger.roomId;
    this.personId = messenger.personId;
  }

  ngOnInit(): void {
    if(this.roomId == null){
      this.router.navigate(['']);
      return;
    }
    
    this.getMessages();
    this.pollingInterval$.pipe(
      takeUntil(this.unsubscribeAll$),
      tap((result: any) => {
        if(!this.messagesPolling$.getValue()){
          this.getMessages();
        }
      })
    ).subscribe()
  }

  getMessages(){
    this.messagesPolling$.next(true);
    this.messenger.getMessages().pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:any)=>{
        if(d.success){
          this.updateMessagesArray(d.messages);
          this.messagesPolling$.next(false);
        } else {
          //Show alert
        }
      }),
    ).subscribe();
  }

  updateMessagesArray(newMessageArray: Message[]){
    for(var m=0;m<newMessageArray.length;m++){
      let newMessage = newMessageArray[m];
      if(this.messages[m]?.id != newMessage.id){
        this.messages.splice(m,0,newMessage);
      }
    }
  }

  sendMessage(){
    if(!this.messageText.valid){
      return;
    }
    let message:Message = {
      id: null,
      from: this.personId,
      text: this.messageText.value,
      media: null
    }
    this.messenger.sendMessage(message).pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:any)=>{
        if(d.success){
          this.messageText.setValue('');
          this.getMessages();
        }
      })
    ).subscribe();
  }
}
