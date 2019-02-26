import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  public isLoggedIn:boolean = false;
  public myInfo = null;

  constructor(private auth: AuthService, private userserv: UserService, private router: Router) { }

  ngOnInit() {
    this.auth.correntLoggedInStatus.subscribe(status=>{
      this.isLoggedIn = status;
    })

    if(this.isLoggedIn){
      this.myInfo = this.userserv.getMyInfo();
    }  
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }

}
