import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  public userid:any;;
  public userInfo:any;
  constructor(private route: ActivatedRoute, private userserv: UserService) { }

  ngOnInit() {
    this.userid = this.route.snapshot.paramMap.get('userid');
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.userserv.getUserInfo(this.userid).subscribe(infos => {
      this.userInfo = infos;
      this.userInfo = this.userInfo.info;
    })
  }

}
