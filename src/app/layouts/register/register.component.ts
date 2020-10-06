import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  Message:string;
  constructor(private spinner: NgxSpinnerService, private router: Router) {

    this.RegisterForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false,[Validators.requiredTrue])
    });


  }

  ngOnInit(): void {
  }

  onSubmit(){}

}
