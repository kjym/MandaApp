import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn:boolean = false;
  public myInfo = null;
  public title = 'MandaKj';

  constructor(private auth: AuthService, private userserv: UserService, private router: Router){}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLogedIn();
  }

  
}
