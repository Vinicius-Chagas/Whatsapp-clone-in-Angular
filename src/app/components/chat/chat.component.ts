import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chats } from 'src/app/interfaces/chats';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() conversation:Chats | null = null;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  @Input() myNumber:string = ''

  constructor(private chatService:ChatService) { 
    this.chatService.message$.subscribe(message => {
      this.conversation?.messages?.unshift(message!);
    })
  }

  ngOnInit(): void {
  }

  submitMessage(event: any){
    const time:Date = new Date();
    let value = event.target.value;
    if(value.length > 0){
      this.chatService.sendMessage(value, this.conversation);
    }
    event.target.value = '';
  }

}
