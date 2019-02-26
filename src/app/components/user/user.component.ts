import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public myInfo: any;
  constructor(private uservice: UserService) { }

  ngOnInit() {
    if(this.uservice.getMyInfo()){
      this.myInfo = this.uservice.getMyInfo();
    }
  }

}
