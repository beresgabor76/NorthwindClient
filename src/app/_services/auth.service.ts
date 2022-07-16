import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginDto } from '../_models/LoginDto';
import { TokenDto } from '../_models/TokenDto';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://localhost:5001/nwapi/user/';
  loginSubject: BehaviorSubject<TokenDto> = new BehaviorSubject(new TokenDto());

  constructor(private http: HttpClient, private messageService: MessageService) { }

  login(username: string, password: string) {
    if (this.CurrentUser && this.CurrentToken) {
      this.messageService.showError("Please logout first!");
      return;
    }
    const loginDto: LoginDto = { username, password };
    this.http.post<TokenDto>(this.baseUrl + 'login', loginDto).subscribe(
      response => {
        if (response && response.username && response.token) {          
          this.loginSubject.next(response);
          this.messageService.showSuccess(`${username} has logged in successfully.`)
        }
      },
      error => {
        console.log(error);        
      }
    )
  }

  logout() {    
    this.loginSubject.next(new TokenDto());
  }

  get CurrentUser() {        
    return this.loginSubject.getValue().username;
  }

  get CurrentToken() {    
    return this.loginSubject.getValue().token;
  }

  register(username: string, password: string) {
    if (this.CurrentUser && this.CurrentToken) {
      this.messageService.showError("Please logout first!");
      return;
    }
    const loginDto: LoginDto = { username, password };
    this.http.post<TokenDto>(this.baseUrl + 'register', loginDto).subscribe(
      response => {
        if (response && response.username && response.token) {
          this.loginSubject.next(response);
          this.messageService.showSuccess(`${username} has registered and logged in successfully.`);          
        }
        else {
          this.loginSubject.next(new TokenDto());
        }
      },
      error => console.log(error)
    )
  } 
}
