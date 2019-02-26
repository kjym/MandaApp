import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: any;
  public message: any;
  public password: any;
  public cpassword: any;
  public useraname: any;
  public firstname: any;
  public lastname: any;



  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit() {
    this.message = "";
    this.clearData();
  }


  onRegister(){
    if(this.password == this.cpassword && (this.password).trim() != ""){

      this.user = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.useraname,
        password: this.password, 
        userid:  null        
      }
      this.userservice.registerUser(this.user).subscribe(data => {
        
            this.message = data.info;
            
            if(data.success){
              this.clearData();
            }
       })
    }
  }

  clearData(){
    this.password   = "";
    this.cpassword  = "";
    this.useraname  = "";
    this.firstname  = "";
    this.lastname   = "";
  }
}
