import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: any;

  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.userservice.getUsersInfo().subscribe(infos =>{
      this.users = infos;
      this.users = this.users.info;
    },
  error =>{
    console.log("error "+error);
  })
  }

  update(userid, i){
     //console.log(this.users[i]);
     this.router.navigate(['/user/update', userid]);
  }

  delete(userid, i){   
    this.userservice.deleteUserInfo(userid).subscribe(data=>{
        if(data.success){
          this.users.splice(i, 1);
        }
    })
 }

}
