import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.isLogedIn());
  correntLoggedInStatus = this.isLoggedIn.asObservable();


  readonly loginApi = "http://www.manda-api.kjym.co.tz/api/login";

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  login(uname, upass){
    return this.http.post<any>(this.loginApi, {username: uname, password: upass});
  }

  isLogedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  changeLoggedInStatus(){
    this.isLoggedIn.next(this.isLogedIn());
  }
  
}
