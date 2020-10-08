import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserResponse } from 'src/app/models/user.interface';
import { RegisterService } from 'src/app/services/register.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  Message: string;

  ShowAlertPrimary: boolean;
  AlertPrimaryTitle: string;
  AlertPrimaryMessage: string;

  ShowAlertSuccess: boolean;
  AlertSuccessTitle: string;
  AlertSuccessMessage: string;

  ShowAlertWarning: boolean;
  AlertWarningTitle: string;
  AlertWarningMessage: string;

  ShowAlertDanger: boolean;
  AlertDangerTitle: string;
  AlertDangerMessage: string;



  ShowFormRrgister: boolean;
  a_response: any;

  NewUserRegister = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    passwordRepeat: ''
  }

  MessageEmail = {
    asuntoCorreo: 'Validamos tu registro',
    nombreCliente: '',
    apellidoCliente: '',
    emailCliente: '',
    encabezado: 'Tenemos el honor de darte la bienvenida',
    parrafoUno: 'Para poder validar tu registro a Jumpq solo siguiendo el link de activación.',
    parrafoDos: '',
    parrafoTres: 'Si existe un problema con el registro por favor contactanos.'
  }

  constructor(private register: RegisterService, private spinner: NgxSpinnerService, private router: Router) {

    this.ShowAlertSuccess = false;
    this.ShowFormRrgister = true;


    this.RegisterForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordRepeat: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue])
    }, {
      validators: this.passwordMatchValidator.bind(this)
    }

    );

  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.spinner.show();

    this.NewUserRegister.nombre = this.RegisterForm.value.nombre;
    this.NewUserRegister.apellido = this.RegisterForm.value.apellido;
    this.NewUserRegister.email = this.RegisterForm.value.email;
    this.NewUserRegister.password = this.RegisterForm.value.password;
    this.NewUserRegister.passwordRepeat = this.RegisterForm.value.passwordRepeat;
    this.NewUserRegister.passwordRepeat = this.RegisterForm.value.passwordRepeat;

    this.register.NewUser(this.NewUserRegister).subscribe(
      res => {

        this.a_response = res;
        console.log("status : ", this.a_response.status);
        if (this.a_response.status == 'OK') {

          //this.router.navigate(['/']);
          this.SendEmailToVerify();

        } else {
          this.Message = this.a_response.message;

          this.ShowAlertSuccess = true;
          this.ShowFormRrgister = false;
          this.AlertWarningTitle = 'El registro fue todo un con Exito!';
          this.AlertWarningMessage = 'Ahora te enviamos un correo electrónico para validar el registro, por favor haz click en el enlace adunto.';

        }
        this.spinner.hide();
      },
      err => console.warn('err : ', err)
    );

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordRepeat').value ? null : { 'mismatch': true };
  }

  SendEmailToVerify() {

    this.MessageEmail.nombreCliente = this.RegisterForm.value.nombre;
    this.MessageEmail.apellidoCliente = this.RegisterForm.value.apellido;
    this.MessageEmail.emailCliente = this.RegisterForm.value.email;

    let linkToEmailVerirify = `${environment.VERIFY_EMAIL_URL}/` + this.MessageEmail.emailCliente;

    this.MessageEmail.parrafoDos = linkToEmailVerirify;

    console.log('MessageEmail : ', this.MessageEmail);

    this.register.NewUserSendEmailToVerify(this.MessageEmail).subscribe(
      res => {

        console.log('res email : ', res)
        this.spinner.hide();

        this.ShowAlertSuccess = true;
        this.ShowFormRrgister = false;
        this.AlertSuccessTitle = 'El registro fue todo un con Exito!';
        this.AlertSuccessMessage = 'Ahora te enviamos un correo electrónico para validar el registro, por favor haz click en el enlace adunto.';

      },
      err => console.warn('err : ', err)
    );

  }
}
