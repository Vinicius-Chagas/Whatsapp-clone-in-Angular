import { Component, Input } from '@angular/core';
import { LoginService } from './service/login.service';
import { ChatService } from './service/chat.service';
import { Chats } from './interfaces/chats';
import { Message } from './interfaces/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'whatsapp-clone';
  conversation: Chats | null= null;
  isLoggedIn:boolean = false;
  myNumber:string = '';

  constructor(private loginService: LoginService, private chatService: ChatService){
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  onInit(): void {
    
  }

  async onConversationClicked(element:{conversation: Chats, myNumber:string}){
    const chatid = element.conversation.id;
    element.conversation.messages = await this.chatService.getMessages(chatid);
    this.conversation = element.conversation;
    this.myNumber = element.myNumber;
  }
  
}
