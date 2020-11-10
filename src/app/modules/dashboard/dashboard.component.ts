import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { JumpqService } from '../../services/jumpq.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  panelPrincipal: boolean;
  modificarEmp: Boolean;
  modificarEstilos: boolean;
  newemail: boolean;
  panelModificarUsuario: boolean;
  paneltablaModificarUsuario: boolean
  modificarcontra: boolean;
  panelcrearUsuario: boolean;
  registro: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    pwd: "",
    pwd2: "",
    email: "",
    tipo: "",
    registroEForm: {}
  };
  Mregistro: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    pwd: "",
    pwd2: "",
    email: "",
    tipo: "",
    registroEForm: {}
  };
  reset: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    pwd: "",
    pwd2: "",
    email: "",
    tipo: "",
    registroEForm: {}
  }
  resultado: boolean;

  empresa = {
    name:"",
    razon:"",
    codigo:"",
    descripcion:"",
    rubro:0,
    cantidad:0
  }
  resultado2: boolean;
  registroEForm: FormGroup;
  registroCForm: FormGroup;
  badpassword: boolean;
  newcompany: boolean;
  user:any ={
    name:"",
    company:""
  };
  ResultadoModificar:boolean
  claveForm: FormGroup;
  passworderror: boolean;
  passwordolderror: boolean;
  passwordsucces: boolean;
  get name_feed() { return this.registroEForm.get('name'); }
  get lastname_feed() { return this.registroEForm.get('lastname'); }
  get rut_feed() { return this.registroEForm.get('rut'); }
  get email_feed() { return this.registroEForm.get('email'); }
  get password_feed() { return this.registroEForm.get('password'); }
  get password2_feed() { return this.registroEForm.get('password2'); }


  get nameEmpresa_feed() { return this.registroCForm.get('nameEmpresa'); }
  get rutEmpresa_feed() { return this.registroCForm.get('rutEmpresa'); }
  get razonSocial_feed() { return this.registroCForm.get('razonSocial'); }
  get descripcion_feed() { return this.registroCForm.get('descripcion'); }
  
  get oldpass_feed() { return this.claveForm.get('oldpass'); }
  get newpass_feed() { return this.claveForm.get('newpass'); }
  get newpass2_feed() { return this.claveForm.get('newpass2'); }
  
  
  mailuser: any;
  an_request: any;
  an_response: any;
  Modificarlist: Array<any> = [{}]
  areatrabajo: any;
  messageRubro:boolean;
  messageCantidad:boolean;
  
  password:any ={
    oldpass:"",
    new:"",
    new2:""
  }
  constructor(private formBuilder: FormBuilder, private jumpservice: JumpqService, private loggin: AuthService) { }

  ngOnInit(): void {
    this.loaduser();
    this.panelPrincipal = true;
    //this.checkmail(this.mailuser);
    this.registroEForm = this.formBuilder.group(
      {
        name: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        lastname: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        rut: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(8)]],
        password2: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(8)]]
      }
    );

    this.registroCForm = this.formBuilder.group(
      {
        nameEmpresa: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        rutEmpresa: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        razonSocial: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        descripcion: ['', [Validators.maxLength(200), Validators.minLength(4)]]
      }
    );

    
    this.claveForm = this.formBuilder.group(
      {
        oldpass: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        newpass: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        newpass2: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        }
    );

  }

  loaduser() {
    var usersend = {
      data : this.loggin.GetToken()
    }
    this.jumpservice.getUserData(usersend).subscribe(
      res => {
        this.an_response = res;
        this.user.company = this.an_response.user.company; 
        this.user.name = this.an_response.user.email;
      
        console.log("Contiene el usuario", this.user);
      }, err => console.error(err)
    );
  }
  checkpassword(){

    if(this.password.new != "" && this.password.new2 !=""){
      if(this.password.new == this.password.new2){
        this.passworderror = false;
      }else{
        this.passworderror = true;
      }   }
  }
/*
  checkmail(data: any) {

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
  }*/

  modificarEst() {
    this.panelPrincipal = false;
    this.modificarEstilos = true;

  }
  modificarEmpresa() {
    this.panelPrincipal = false;
    this.modificarEmp = true;
    this.cargardatosEmpresa();
  }

  ModificarEmpresaForm(){
    this.ResultadoModificar = false;
  if(this.newcompany == false && this.empresa.rubro >= 1 && this.empresa.cantidad >= 1){
    
      this.an_request = {
        companyname:this.empresa.name,
        companyrut:this.empresa.codigo,
        companyRsocial:this.empresa.razon,
        companydescription:this.empresa.descripcion,
        companytype:this.empresa.rubro,
        companyEnumber:this.empresa.cantidad,
        id:this.user.company
    };
    this.jumpservice.modificarcompañia(this.an_request).subscribe(
      res => {
        this.an_response = res;
        console.info(this.an_response);
        if(this.an_response.status == "OK"){
          this.ResultadoModificar=true;
        }
      }

      , err => console.error(err)
    );



  }

  }

  ModificarContrasenaUsuario() {
    console.info("entro aca en el pass");
    this.modificarcontra = true;
    this.panelPrincipal = false;
  }
  modificarUserform(data: any) {
    this.panelModificarUsuario = true;
    this.paneltablaModificarUsuario = false;

    this.Mregistro.nombre = data.nombre;
    this.Mregistro.apellidos = data.apellido;
    this.Mregistro.email = data.email;
    this.Mregistro.nombre = data.nombre;
    this.Mregistro.tipo = data.tipo;
    this.Mregistro.rut = data.identification;
    console.info(data);
  }
  CrearUsuario() {
    this.panelPrincipal = false;
    this.panelcrearUsuario = true;

  }

  tipo(data: any) {

    if (this.panelcrearUsuario == true) {
      this.registro.tipo = data;
    }

    if (this.panelModificarUsuario == true) {
      this.Mregistro.tipo = data;
    }

  }

  checkpass() {
    if (this.registro.pwd != "" && this.registro.pwd2 != "") {
      console.info("entro");

      if (this.registro.pwd == this.registro.pwd2) {
        this.badpassword = false;
      } else {
        this.badpassword = true;
      }

    }
  }
  guardarRubro(event : any){
    console.info("entro y tiene " ,event);
    if(event >=1){
      this.messageRubro=false;
    }else{
      this.messageRubro= true;
    }
    this.empresa.rubro = event;
  }

  guardarEmpleados(event : any){
    if(event >=1){
      this.messageCantidad=false;
    }else{
      this.messageCantidad= true;
    }
    this.empresa.cantidad = event; 
  }

  RegistrarUsuario() {

    console.info(this.registro);

    this.an_request = {
      nombre: this.registro.nombre,
      apellidos: this.registro.apellidos,
      rut: this.registro.rut,
      pwd: this.registro.pwd,
      type: this.registro.tipo,
      status: 1,
      email: this.registro.email,
      company: 8
    }

    if (this.badpassword == false) {
      this.jumpservice.postNewUser(this.an_request).subscribe(
        res => {
          this.an_response = res;
          console.info(res);
          if (this.an_response.status == "OK") {
            console.info("usuario creado");
            this.resultado = true;
            this.registro = this.reset;
          }
        },
        err => console.warn('err : ', err)

      );

    }


  }

  Modificarclave() {

  }
  ModificarpasswordForm(){
    this.an_request = {
    email: this.user.name,
    oldpass : this.password.oldpass,
    newpass : this.password.new
    }
    
    if(this.passworderror == false){
      console.info("todo ok");
      this.jumpservice.modificarpassword(this.an_request).subscribe(
        res => {
          this.an_response = res;
          console.info(res);
          if (this.an_response.status == "OK") {
            this.passwordolderror = false;
            this.passwordsucces = true;
          }else{
            this.passwordolderror = true;
            this.passwordsucces= false;
          }
        },
        err => console.warn('err : ', err)

      );

    }

  }

  CargarModificarUsuario() {
    this.panelPrincipal = false;
    this.an_request = {
      email: 8

    };
    this.jumpservice.modificarlist(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.Modificarlist = this.an_response.user;
        console.info("mail es ", this.mailuser);
        console.info("Contiene", this.Modificarlist);
        this.paneltablaModificarUsuario = true;


      }

      , err => console.error(err)
    );

  }


  cargardatosEmpresa(){
    this.an_request={
      id:8
    };
    this.jumpservice.cargarcompañia(this.an_request).subscribe(
      res => {
        this.an_response = res;
        console.info("Contiene la empresa", this.an_response);
        if(this.an_response.status == "OK"){
          this.newcompany = false;
          this.empresa.name = this.an_response.companies.company_name;
          this.empresa.codigo = this.an_response.companies.company_code;
          this.empresa.razon = this.an_response.companies.company_business_name;
          this.empresa.descripcion = this.an_response.companies.company_description;
          this.empresa.rubro = this.an_response.companies.business_item_id;
          this.empresa.cantidad = this.an_response.companies.company_cant_emp;
          this.cargardroplist();
        }else{
          this.newcompany = true;
          this.cargardroplist();
        }

      }

      , err => console.error(err)
    );


  }
  cargardroplist() {
    this.jumpservice.getBusinnes().subscribe(
      res => {
        this.an_response = res;
        this.areatrabajo = this.an_response.businessItem
        console.info("Contiene", this.areatrabajo);

      }

      , err => console.error(err)
    );
  }

  ModificarUsuario() {


    console.info(this.Mregistro);

    this.an_request = {
      nombre: this.Mregistro.nombre,
      apellidos: this.Mregistro.apellidos,
      rut: this.Mregistro.rut,
      pwd: this.Mregistro.pwd,
      type: this.Mregistro.tipo,
      status: 1,
      email: this.Mregistro.email,
      company: 8
    }

      this.jumpservice.postmodificarUser(this.an_request).subscribe(
        res => {
          this.an_response = res;
          console.info(res);
          if (this.an_response.status == "OK") {
            console.info("usuario creado");
            this.resultado2 = true;
            this.Mregistro = this.reset;
          }
        },
        err => console.warn('err : ', err)

      );
    }



  salir() {
    this.panelPrincipal = true;
    this.modificarEstilos = false;
    this.modificarEmp = false;
    this.panelcrearUsuario = false;
    this.paneltablaModificarUsuario = false;
    this.modificarcontra = false;
    this.panelModificarUsuario = false;
  }
}
