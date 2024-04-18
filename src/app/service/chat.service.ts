import { Injectable, OnInit } from '@angular/core';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chats } from '../interfaces/chats';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';
import { User } from '../interfaces/user';
import { Message } from '../interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  stompClient: any = null;
  public msg:String[] = [];
  phone_number:string = '';
  data:string = '';
  user:User | null = null;

  private _message:BehaviorSubject<Message| null>;
  message$;

  constructor(private http: HttpClient, private loginService:LoginService) {
    this.loginService.user$.subscribe(user => {
      this.user = user;
    });
    this._message = new BehaviorSubject<Message | null>(null);
    this.message$ = this._message.asObservable();    
  }

  connect(): void{
    this.stompClient = Stomp.over(function(){
      return new SockJS('http://localhost:8080/ws');
    });
    this.stompClient.connect({},(frame:any) => {
      this.onConnected(frame)
    } , this.onError);
  }
  
  onConnected(frame:any): void{
      this.stompClient.subscribe(`/user/${this.user?.phone_number}/queue/messages`, (message:any) => this.onMessageReceived(message));
  }
  
  onError(): void{
    
  }

  onMessageReceived(message: any):void{
    let messageContent:Message = JSON.parse(message.body);
    this._message.next(messageContent);
  }

  

  async getChats(): Promise<Chats[] | null>{
   try{
        const response = await firstValueFrom(this.http.get<Chats[]>(`http://localhost:8080/chats/${this.user!.id}`));
        console.log({response})
        return response;
        
    } catch(error){
      throw new Error("Erro ao buscar chats");
    }

  }

  //For new chats, checks if the user exists and if so, sends a message to create a chat
  async createChat(receiverNumber:string): Promise<Chats | null>{
    try{
        const body = {senderNumber:this.user?.phone_number, receiverNumber:receiverNumber}
         const response:Chats | null = await firstValueFrom(this.http.post<Chats | null>(`http://localhost:8080/createChat`,body,
          {headers: new HttpHeaders(
            { 'Content-Type': 'application/json' 
          }) 
        }));
         console.log({response})
         if(response != null){
           return response;
         }
         else{
          alert("Couldnt create chat");
          return null;
         } 
      } catch(error){
          throw new Error("Erro ao buscar chats");
      }
 
   }

  async getMessages(chatID:number):Promise<Message[]>{
    try{
      const messages = await firstValueFrom<Message[]>(this.http.get<Message[]>(`http://localhost:8080/messages/${chatID}`));
      const newmessages = messages.reverse().map((message:Message) => (
        {...message,
          created: new Date(message.created)
        }));
        return newmessages;
    }
    catch(error){
      console.error("Erro ao buscar messages");
      throw new Error;
    }
    
  }

 sendMessage(value:string, chat:Chats | null): void{
    
    const receiver = chat!.sender_id.phone_number !== this.user?.phone_number ? chat!.sender_id : chat!.receiver_id;
      
    const sendMessage = { senderID: this.user?.phone_number, receiverID: receiver.phone_number,content: value, chatID: chat!.id };

    let message:Message = {chat_id: chat!, message: value, sender_id: this.user!, receiver_id: receiver, created: new Date()}

    this.stompClient.send('/app/chat',{},JSON.stringify(sendMessage));

    this._message.next(message);

  }
}
