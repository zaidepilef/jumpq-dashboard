import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import {AuthService} from '../../services/auth.service'
import { JumpqService } from '../../services/jumpq.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  panelPrincipal:boolean;
  modificarEmp:Boolean;
  modificarEstilos:boolean;
  newemail:boolean;
  panelModificarUsuario:boolean;
  paneltablaModificarUsuario:boolean
  ModificarContraseña:boolean;
panelcrearUsuario:boolean;
  registro: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    pwd: "",
    email:"",
    registroEForm:{}
    };
  registroEForm: FormGroup;
  get name_feed() { return this.registroEForm.get('name'); }
    get lastname_feed() { return this.registroEForm.get('lastname'); }
    get rut_feed() { return this.registroEForm.get('rut'); }
    get email_feed() { return this.registroEForm.get('email'); }
    get password_feed() { return this.registroEForm.get('password'); }
    get password2_feed() { return this.registroEForm.get('password2'); }
  
    get nameEmpresa_feed() { return this.registroEForm.get('nameEmpresa'); }
    get rutEmpresa_feed() { return this.registroEForm.get('rutEmpresa'); }
    get razonSocial_feed() { return this.registroEForm.get('razonSocial'); }
    get descripcion_feed() { return this.registroEForm.get('descripcion'); }
    mailuser: any;
    an_request:any;
    an_response:any;
    Modificarlist:Array<any>=[{}]
    areatrabajo:any;
  constructor(private formBuilder: FormBuilder,private jumpservice: JumpqService,private loggin:AuthService) { }
  
  ngOnInit(): void {
    this.mailuser=this.loggin.GetToken();
    this.panelPrincipal=true; 
    this.checkmail(this.mailuser);
    this.registroEForm = this.formBuilder.group(
      {
        name: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required,Validators.maxLength(32),Validators.minLength(4)]],
        lastname: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required,Validators.maxLength(32),Validators.minLength(4)]],
        rut: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.maxLength(32),Validators.minLength(8)]],
        password2: ['', [Validators.required,Validators.maxLength(32),Validators.minLength(8)]]
      }
    )

  }

  checkmail(data : any){
     
    this.an_request = {
      email: this.mailuser
  
  };
  
  this.jumpservice.getmail().subscribe(
      res => {
          this.an_response = res;
        console.info(this.an_response);
      }
  
      , err => console.error(err)
  );
  }
  modificarEst(){
  this.panelPrincipal = false;
  this.modificarEstilos = true;
 
  }
  modificarEmpresa(){
    this.panelPrincipal = false;
    this.modificarEmp=true;
    this.cargardroplist();
  }
  ModificarContraseñaUsuario(){
    this.ModificarContraseña=true;
    this.panelPrincipal = false;
  }
  modificarUserform(data:any){
    console.info(data);
  }
  CrearUsuario(){
    this.panelPrincipal = false;
    this.panelcrearUsuario = true;
   
  }
  
  RegistrarUsuario(){
  
  }

  ModificarUsuario(){
    this.panelPrincipal = false;
  this.an_request = {
    email: 8

};
this.jumpservice.modificarlist(this.an_request).subscribe(
    res => {
        this.an_response = res;
        
        this.Modificarlist = this.an_response.user;
        console.info("mail es ",this.mailuser);
        console.info("Contiene",this.Modificarlist);
        this.paneltablaModificarUsuario = true;
     
      
    }

    , err => console.error(err)
);

  }


  cargardroplist(){
    this.jumpservice.getBusinnes().subscribe(
      res => {
          this.an_response = res;
          this.areatrabajo = this.an_response.businessItem
          console.info("Contiene",this.areatrabajo);
         
       
        
      }
  
      , err => console.error(err)
  );  
  }



  salir(){
    this.panelPrincipal = true;
    this.modificarEstilos=false;
    this.modificarEmp = false;
    this.panelcrearUsuario = false;
    this.paneltablaModificarUsuario = false;
    this.ModificarContraseña=false;
  }
}
