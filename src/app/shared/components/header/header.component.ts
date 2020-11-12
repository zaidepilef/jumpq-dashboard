import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { JumpqService } from 'src/app/services/jumpq.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  user:any = {
    name: ""
  }
  an_response:any;
  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private router: Router, private jumpservice: JumpqService, private loggin: AuthService) { }


  ngOnInit(): void {
    this.loaduser();
  }

  loaduser() {
    var usersend = {
      data : this.loggin.GetToken()
    }
    this.jumpservice.getUserData(usersend).subscribe(
      res => {
        this.an_response = res;
        this.user.name = this.an_response.user.name;
      
        console.log("Contiene el usuario nombre", this.an_response);
      }, err => console.error(err)
    );
  }
  onClickMe() {
    console.log('logout');

    this.spinner.show();
  
    this.auth.Logout()

  }


}
