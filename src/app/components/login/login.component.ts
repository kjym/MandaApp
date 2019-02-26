import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public message = "";
  public username = "";
  public password = "";
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }


  login(){
  
    this.auth.login(this.username, this.password).subscribe(
      infos => {
        
        if(infos.success){
          localStorage.setItem('token', infos.info);
          this.auth.changeLoggedInStatus();
          this.router.navigate(['/home']);
          return;
        }else{
          this.message = infos.info;
        }
      }
    )
  }

}
