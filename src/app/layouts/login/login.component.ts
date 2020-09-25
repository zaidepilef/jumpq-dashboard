import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  UserData: User;
  an_response: any = {};
  ngOnInit(): void {

    this.UserData.email= "felipe.diaz@gmail.com";
    this.UserData.password= "qwerty202122";
    
    this.auth.Login(this.UserData).subscribe(
      res => {
        console.log(res);
      },
      err => console.warn('err : ', err)
    );
  }

}
