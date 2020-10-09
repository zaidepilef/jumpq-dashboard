import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserResponse } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.sass']
})
export class ForgotComponent implements OnInit {

  ForgotForm: FormGroup;
  UserData: User;
  UserResponse: UserResponse;
  Message: string;

  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private router: Router) {
    
    this.ForgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.UserData = {
      username: '',
      email: '',
      password: ''
    };
    
  }

  ngOnInit(): void {
  
  }

  onSubmit() {

		this.spinner.show();
		this.UserData.email = this.ForgotForm.value.email;
  
		this.auth.ForgotPassword(this.UserData).subscribe(
			res => {
        console.log("status : ", res.status);
				this.spinner.hide();
			},
			err => console.warn('err : ', err)
    );
    
	}


}
