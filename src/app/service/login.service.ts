import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._loggedIn.asObservable();

  private _user:BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  constructor(
    private http: HttpClient
  ) { }

    async sendHttpLoginRequest(phone_number: string, password:string):Promise<User> {
      const data = {phone_number: phone_number,password:password};
      try{
        const user = await firstValueFrom<User>(this.http.post<User>('http://localhost:8080/login', 
          data, 
            { headers: new HttpHeaders(
              { 'Content-Type': 'application/json' 
            }) 
          })
        );
        this._user.next(user);
        this._loggedIn.next(true);
        return user;
      }
      catch(error){
        alert("Usuário ou senha incorretos");
        throw new Error;
      }
    }

    async sentHttpSignInRequest(phone_number: string, password:string):Promise<User>  {
      const data = {phone_number: phone_number,password:password};
      try{
        const user = await firstValueFrom<User>(this.http.post<User>('http://localhost:8080/signin', 
          data, { 
            headers: new HttpHeaders({ 
              'Content-Type': 'application/json' 
            })
          })
        );
        return user;
      }
      catch(error){
        alert("Usuário ou senha incorretos");
        throw new Error;
      }
    }

  
}
