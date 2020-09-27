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

  LoginForm:FormGroup;
  UserData:User;
  
  
  constructor(private auth: AuthService) {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    
    this.UserData={
      username:'',
      email:'',
      password:''
    };


   }



  ngOnInit(): void {

  }


  onSubmit() {

    console.log('LoginForm : ', this.LoginForm.value)

    this.UserData.email = this.LoginForm.value.email;

    this.UserData.password = this.LoginForm.value.password;

    console.log('UserData : ', this.UserData)

    this.auth.Login(this.UserData).subscribe(
      res => {
        console.log(res);
      },
      err => console.warn('err : ', err)
    );

  }



}
