import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chats } from 'src/app/interfaces/chats';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchText: string = '';

@Output() conversationClicked: EventEmitter<any> = new EventEmitter();

conversations: Chats[] | null= [];
@Output() myNumber:string | undefined = '';

  /*get filteredConversations(){
    return this.conversations.filter((conversation) => {
      return conversation.name.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) ||
      conversation.message.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase());
    })
  }*/

  constructor(private chatService: ChatService) {

   }

  ngOnInit(): void {

    this.chatService.getChats().then((response) => {this.conversations = response});
    console.log(this.conversations)
    this.myNumber = this.chatService.user!.phone_number;

  }

}
