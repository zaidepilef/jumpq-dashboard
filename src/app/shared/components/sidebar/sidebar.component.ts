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

  constructor(private auth: AuthService,private jumpq:JumpqService) { }
  User :any = this.auth.GetMail();
  an_request:any;
  an_response:any;
  userdata:any={
    name:"",
    company_id:""
  };
  nameload:boolean;
  ngOnInit(): void {
    this.loaduser();

    
  }

  onClickMe(){
    console.log('logout');

   
  
    this.auth.Logout()
  }
  loaduser() {
    this.an_request = {
        id: this.User
    };

    this.jumpq.userdata(this.an_request).subscribe(
        res => {
            this.an_response = res;
            this.userdata = this.an_response.usuario;
            this.nameload=true;
            console.info("Contiene el usuario",this.userdata);
            
        }

        , err => console.error(err)
    );
}
}
