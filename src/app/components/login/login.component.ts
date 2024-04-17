import { Component, OnInit, ViewChild, ElementRef, Input, Injectable } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ChatService } from 'src/app/service/chat.service';
import { Message } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  @ViewChild('registerForm') registerForm: ElementRef<HTMLFormElement> | undefined;
  @ViewChild('loginForm') loginForm: HTMLElement | undefined;
  createAnAccount: boolean = false;
  phone_number: string = '';
  password: string = '';
  confirmPassword: string = '';
  user: User | null = null;
  
  
  constructor(
    private loginService: LoginService,
    private chatService: ChatService
    ){}

  ngOnInit(): void {
  }

  createAnAccountFunction(): void {
    this.createAnAccount = !this.createAnAccount;
  }

  sendSignInRequest():void{
    if(this.password = this.confirmPassword){
      this.loginService.sentHttpSignInRequest(this.phone_number, this.password);
    }
    else{
      alert("As senhas não são iguais");
    }

  }

  sendLoginRequest():void{
      try{
        this.loginService.sendHttpLoginRequest(this.phone_number, this.password).then((response: User | null) => {
            this.chatService.connect();  
            return response;
        })
      }
    catch(error){
      alert("Usuário ou senha incorretos");
      throw new Error;
    }
  }
}
