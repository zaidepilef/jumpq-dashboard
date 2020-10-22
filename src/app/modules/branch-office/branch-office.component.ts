import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JumpqService } from '../../services/jumpq.service';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.sass']
})
export class BranchOfficeComponent implements OnInit {
  panelPrincipal: boolean;
  panelcrearsucursal: boolean;
  panelcrearsucursalE: boolean;
  paneltablaconfigurarSucursal: boolean;
  paneltablamodificarSucursal: boolean;

  regiones: Array<any> = [];
  provincia: Array<any> = [];
  Comunas: Array<any> = [];
  registro: any = {
    company: 8,
    nombre: "",
    direccion: "",
    direccion2: "",
    comuna: "",
    codlocalidad: "",
    urlmap: "",
    cod_prov: "",
    cod_parr: 0
    
  };
  get nombre_feed() { return this.registroEForm.get('nombre'); }
  get direccion_feed() { return this.registroEForm.get('direccion'); }
  get direccion2_feed() { return this.registroEForm.get('direccion2'); }
  get urlmap_feed() { return this.registroEForm.get('urlmap'); }


  registroEForm: FormGroup;
  an_request: any;
  an_response: any;
  tablachile: Array<any> = [];
  tablaecuador: Array<any> = [];
  sucursalresult:boolean;
  parroquiaerr : boolean;
  surc_name : any;
  constructor(private formBuilder: FormBuilder, private jumpservice: JumpqService, private loggin: AuthService) { }





  ngOnInit(): void {
    this.panelPrincipal = true;
    this.cargarProvincia();
    this.registroEForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
        direccion: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
        direccion2: ['', [Validators.maxLength(50), Validators.minLength(4)]],
        urlmap: ['', [Validators.required]]
      }
    )




  }

  panelsucursal() {
    this.panelPrincipal = false;
    this.panelcrearsucursal = true;
  }
  panelsucursalE() {
    this.panelPrincipal = false;
    this.panelcrearsucursalE = true;
  }
  panelConfSucursal() {
    this.panelPrincipal = false;
    this.paneltablaconfigurarSucursal = true;
    this.cargartablachile();
  }
  salir() {
    this.panelPrincipal = true;
    this.panelcrearsucursal = false;
    this.panelcrearsucursalE = false;
    this.paneltablaconfigurarSucursal = false;
    this.paneltablamodificarSucursal = false;
  }

  panelModfSucursal() {
    this.paneltablamodificarSucursal = true;
    this.panelPrincipal = false;
    this.cargartablachile();
  }

  cargarProvincia() {
    this.Comunas = [];
    this.provincia = [];
    this.an_request = {
      company: 8
    };
    this.jumpservice.cargarProvincia(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.regiones = this.an_response;
      }

      , err => console.error(err)
    );

  }
  cargarCiudad(event : any){
    this.Comunas = [];
    this.provincia = [];
    
    this.an_request = {
      id: event
    };
    this.jumpservice.cargarciudad(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.provincia = this.an_response;
      }

      , err => console.error(err)
    );
    
  }

  cargarParroquia(event : any){
    this.registro.cod_prov = event;
    this.an_request = {
      id: event
    };
    this.jumpservice.cargarparroquia(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.Comunas = this.an_response;
      }

      , err => console.error(err)
    );
    
  }

  guardarParroquia(event:any){
    this.parroquiaerr = false;
    this.registro.cod_parr = event;

  }

  cargartablachile() {
    this.panelPrincipal = false;
    this.an_request = {
      email: 8

    };
    this.jumpservice.getsucursalchile(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.tablachile = this.an_response.sucursal;
        console.info(this.tablachile);

      }

      , err => console.error(err)
    );

  }

  crearnuevaSucursal(){
    
    console.info(this.registro);
    
    this.an_request ={
      company_id: 8,
      nombre:this.registro.nombre,
      dirrecion:this.registro.direccion,
      dirrecion2:this.registro.direccion2,
      COD_PROV:this.registro.cod_prov,
      cod_localidad:this.registro.cod_parr,
      urlmap:this.registro.urlmap
    }
    if(this.registro.cod_parr > 0){

      this.jumpservice.crearSucursal(this.an_request).subscribe(
        res => {
          this.an_response = res;
          
          this.registro.cod_parr = 0;
          this.surc_name = this.registro.nombre;
          this.sucursalresult = true;
          this.cargarProvincia();
        }
  
        , err => console.error(err)
      );
  
  

    }else{
      this.sucursalresult = false;
      this.parroquiaerr = true;
    }
    
    


  }




}
