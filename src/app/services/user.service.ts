import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  public myInfo: User = null;

  readonly baseUsersApi = "http://www.manda-api.kjym.co.tz/api/";

  constructor(private http: HttpClient, private auth:AuthService, private router: Router) { }


  getUsersInfo(){
    return this.http.get(this.baseUsersApi+'users/info');
  }

  getUserInfo(userid):Observable<any>{
    return this.http.get<any>(this.baseUsersApi+'user/info/'+userid);
  }

  updateUserInfo(useinfo):Observable<any>{
    return this.http.put<any>(this.baseUsersApi+'update',useinfo);
  }

  deleteUserInfo(userid):Observable<any>{
    return this.http.delete<any>(this.baseUsersApi+'delete/'+userid);
  }

  registerUser(userinfo):Observable<any>{
    return this.http.post<any>(this.baseUsersApi+'register',userinfo);
  }


  isLogedIn(){
    return this.auth.isLogedIn();
  }

  loadMyInfo():Observable<any>{
      return this.http.get<any>(this.baseUsersApi+'my/info/'+this.getMyToken());
  }

  getMyInfo():Observable<User>{
    this.loadMyInfo().subscribe(datas => {
      if(datas.success){
        return datas.info;
      }else{
        this.router.navigate(['login']);     
      }
    });  
    return null; 
  }

  getMyToken(){
    if(this.isLogedIn()){
      return localStorage.getItem('token');
    }
    return -10;
  }

}
