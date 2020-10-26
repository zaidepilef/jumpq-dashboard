import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'
import { JumpqService } from 'src/app/services/jumpq.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private jumpqService: JumpqService) { }

  User: any = this.auth.GetToken();
  an_request: any;
  an_response: any;
  userdata: any = {
    name: "",
    company_id: ""
  };
  nameload: boolean;
  
  ngOnInit(): void {
   this.loaduser();
  }
 

  loaduser() {
    var usersend = {
      data : this.User
    }
    this.jumpqService.getUserData(usersend).subscribe(
      res => {
        console.log("Contiene el usuario", res);
      }, err => console.error(err)
    );
  }
}
