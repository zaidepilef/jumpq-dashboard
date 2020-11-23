import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserResponse } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service'
import * as CryptoJS from 'crypto-js';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

	LoginForm: FormGroup;
	UserData = {
		email: '',
		password: ''
	};
	errormessage:boolean;
	UserResponse: UserResponse;
	Message: string;
	a_response: any;

	constructor(private auth: AuthService, private spinner: NgxSpinnerService, private router: Router) {

		this.LoginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});

	}

	ngOnInit(): void {

	}

	onSubmit() {
		this.errormessage = false;
		this.spinner.show();
		this.UserData.email = this.LoginForm.value.email;
		this.UserData.password = this.LoginForm.value.password;
	
		this.auth.SignIn(this.UserData).subscribe(
			res => {
				this.a_response = res;
				
				
				if (this.a_response.status == 'OK') {
					this.auth.SaveToken(this.a_response.jwt);
					this.router.navigate(['/']);
				} else {
					this.errormessage = true;
					this.Message = this.a_response.message
				}


				this.spinner.hide();
			},
			err => console.warn('err : ', err)
		);
	}



}
