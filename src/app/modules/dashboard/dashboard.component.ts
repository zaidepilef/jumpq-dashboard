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
    tipo: 2,
    registroEForm: {}
  };
  Imagen:any ={

  }
  Mregistro: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    pwd: "",
    pwd2: "",
    email: "",
    tipo: 2,
    estado:"",
    registroEForm: {}
  };
  reset: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    pwd: "",
    pwd2: "",
    email: "",
    tipo: 2,
    estado:"",
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
  emailcheckfail: boolean;
  errorestado: boolean;

  linkJumpq:any="test";
  conteosucursal: any = 0;
  conteoconfiguracion: any = 0;
  nolink: boolean = false;
  nolinkalert: boolean = false;
  loadingpanel: boolean;
  noimgvalid: boolean;
  imgsuccess: boolean;
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
  Modificarlist: Array<any> = []
  areatrabajo: any;
  messageRubro:boolean;
  messageCantidad:boolean;
  ModeOf:boolean = false;
  password:any ={
    oldpass:"",
    new:"",
    new2:""
  }
  file : File = null;


  url:any = "https://jumpnodeapi.azurewebsites.net/imaga/noimg.jpg";
  constructor(private formBuilder: FormBuilder, private jumpservice: JumpqService, private loggin: AuthService) { }

  ngOnInit(): void {
    
   

    this.loaduser();
    
    //this.checkmail(this.mailuser);

    this.formcheckusuario();
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

  formcheckusuario(){
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
  }
  loaduser() {
    this.loadingpanel=true;
    this.panelPrincipal=false;
    var usersend = {
      data : this.loggin.GetToken()
    }
    this.jumpservice.getUserData(usersend).subscribe(
      res => {
        this.an_response = res;
        this.user.company = this.an_response.user.company; 
        this.user.name = this.an_response.user.email;
        this.loadingpanel=false;
        this.panelPrincipal=true;
       
      }, err => {
        this.loadingpanel=true;
        this.panelPrincipal=false;
      }
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

  genjumpQ() {
    this.panelPrincipal = false;
    this.modificarEstilos = true;

    this.an_request = {
      company : this.user.company
    }
    this.MostrarSucursales(this.an_request);
    this.MostrarConfiguracion(this.an_request);
    this.BuscarJumpq(this.an_request);
  }


  MostrarSucursales(data : any){
    this.jumpservice.ContarSucursal(data).subscribe(
      res => {
        this.an_response = res;

        this.conteosucursal = this.an_response.sucursal.sucursales;
      }

      , err => console.error(err)
    );
  }

  MostrarConfiguracion(data : any){
    this.jumpservice.ContarConfiguracion(data).subscribe(
      res => {
        this.an_response = res;
         
        this.conteoconfiguracion = this.an_response.sucursal.conteo;
         
      }

      , err => console.error(err)
    );
  }

  BuscarJumpq(data : any){
    this.jumpservice.linkjumpq(data).subscribe(
      res => {
        this.an_response = res;
        console.info(this.an_response);
        if(this.an_response.status == "OK"){
          this.linkJumpq = this.an_response.link.linkjump;
          this.url = "https://jumpnodeapi.azurewebsites.net/imaga/"+this.an_response.link.logo_image;
          this.nolink=true;
          this.nolinkalert=false;
        }else{
          this.nolink=false;
          this.nolinkalert=true;
        }
        
         
      }

      , err => console.error(err)
    );
  }

  modificarEmpresa() {
    this.ResultadoModificar = false;
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
        
        if(this.an_response.status == "OK"){
          this.ResultadoModificar=true;
        }
      }

      , err => console.error(err)
    );



  }

  }

  ModificarContrasenaUsuario() {
   
    this.modificarcontra = true;
    this.panelPrincipal = false;
  }
  modificarUserform(data: any) {
    this.panelModificarUsuario = true;
    this.paneltablaModificarUsuario = false;
    this.resultado2 = false;
    this.errorestado = false;
    this.Mregistro.nombre = data.nombre;
    this.Mregistro.apellidos = data.apellido;
    this.Mregistro.email = data.email;
    this.Mregistro.nombre = data.nombre;
    this.Mregistro.tipo = 2;
    this.Mregistro.rut = data.identification;
    if(data.estado=="Activa"){
      this.Mregistro.estado = 1;
    }
    if(data.estado=="Desactivada"){
      this.Mregistro.estado = 2;
    }

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
      this.Mregistro.estado = data;
     
      
    }

  }

  checkpass() {
    if (this.registro.pwd != "" && this.registro.pwd2 != "") {
     

      if (this.registro.pwd == this.registro.pwd2) {
        this.badpassword = false;
      } else {
        this.badpassword = true;
      }

    }
  }
  guardarRubro(event : any){
 
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
    this.emailcheckfail = false;
    

    this.an_request = {
      nombre: this.registro.nombre,
      apellidos: this.registro.apellidos,
      rut: this.registro.rut,
      pwd: this.registro.pwd,
      type: this.registro.tipo,
      status: 1,
      email: this.registro.email,
      company: this.user.company
    }
   
    if (this.badpassword == false) {
      this.jumpservice.postNewUser(this.an_request).subscribe(
        res => {
          this.an_response = res;
      
          if (this.an_response.status == "OK") {

            this.resultado = true;
            this.registro = this.reset;
            this.formcheckusuario();
          } if (this.an_response.status == "NOOK") {
            this.emailcheckfail = true;
          }
        },
        err => console.warn('err : ', err)

      );

    }


  }

  Crearjumpq() {
    this.an_request = {
      company : this.user.company
    }
    this.jumpservice.crearlinkjumpq(this.an_request).subscribe(
      res => {
        this.an_response = res;
        if(this.an_response.status =="OK"){
          this.genjumpQ();
        }else{

        }
 
      }

      , err => console.error(err)
    );
  }

  ModificarpasswordForm(){
    this.an_request = {
    email: this.user.name,
    oldpass : this.password.oldpass,
    newpass : this.password.new
    }
    
    if(this.passworderror == false){

      this.jumpservice.modificarpassword(this.an_request).subscribe(
        res => {
          this.an_response = res;
       
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
      email: this.user.company
    };
    this.jumpservice.modificarlist(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.Modificarlist = this.an_response.user;
        for (var i = 0; i < this.Modificarlist.length; i++){
          if (this.Modificarlist[i].estado == 1) {
            this.Modificarlist[i].estado = "Activa";
        } else {
            this.Modificarlist[i].estado = "Desactivada";
        }

        }
        this.paneltablaModificarUsuario = true;


      }

      , err => console.error(err)
    );

  }


  cargardatosEmpresa(){
    this.an_request={
      id:this.user.company
    };
    this.jumpservice.cargarcompañia(this.an_request).subscribe(
      res => {
        this.an_response = res;

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


      }

      , err => console.error(err)
    );
  }

  ModificarUsuario() {
    this.resultado2=false;


    this.an_request = {
      nombre: this.Mregistro.nombre,
      apellidos: this.Mregistro.apellidos,
      rut: this.Mregistro.rut,
      pwd: this.Mregistro.pwd,
      type: 2,
      status: this.Mregistro.estado,
      email: this.Mregistro.email,
      company: this.user.company
    }
    if(this.Mregistro.estado > 0){
      this.errorestado = false;
      this.jumpservice.postmodificarUser(this.an_request).subscribe(
        res => {
          this.an_response = res;
      
          if (this.an_response.status == "OK") {
             this.resultado2 = true;
          }
        },
        err => console.warn('err : ', err)

      );
    }else{
      this.errorestado = true
    }
      
    }

 

  salir() {
    this.panelPrincipal = true;
    this.modificarEstilos = false;
    this.modificarEmp = false;
    this.panelcrearUsuario = false;
    this.paneltablaModificarUsuario = false;
    this.modificarcontra = false;
    this.panelModificarUsuario = false;
    this.imgsuccess = false;
  }




pruebaimg(event : any){
  this.noimgvalid = false;
    this.an_request = {};

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.url = event.target.result;
    }
     
    reader.readAsDataURL(event.target.files[0]);
    this.file = <File>event.target.files[0];
 
}

subirImg(){
   
 
  if(this.file != null){
    this.jumpservice.pruebaimg(this.user.company,this.file).subscribe(
      res => {
        this.an_response = res;
        if(this.an_response.status == "OK"){
          this.imgsuccess = true;
        }
      },
      err => console.warn('err : ', err)
    )
    }else{
    console.info("no valido");
    this.noimgvalid = true;
  }
    


}


}
