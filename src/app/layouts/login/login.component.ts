import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {



  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService) { }

  UserData: User;
  an_response: any = {};


  ngOnInit(): void {

  }


  onSubmit() {
    console.log('LoginForm : ', this.LoginForm.value)

    this.UserData.email = "felipe.diaz@gmail.com";

    this.UserData.password = "qwerty202122";

    this.auth.Login(this.UserData).subscribe(
      res => {
        console.log(res);
      },
      err => console.warn('err : ', err)
    );

  }



}
