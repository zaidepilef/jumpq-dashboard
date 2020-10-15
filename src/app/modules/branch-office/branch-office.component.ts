import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { JumpqService } from '../../services/jumpq.service';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.sass']
})
export class BranchOfficeComponent implements OnInit {
  panelPrincipal:boolean;
  panelcrearsucursal:boolean;
  panelcrearsucursalE:boolean;
  paneltablaconfigurarSucursal:boolean;
  paneltablamodificarSucursal:boolean;
  
  regiones :Array<any>=[];
  provincia :Array<any>=[];
  Comunas :Array<any>=[];
  registro: any = {
    company: 8,
    nombre: "",
    direccion: "",
    direccion2: "",
    comuna:"",
    codlocalidad:"",
    urlmap : "",
    };
    get nombre_feed() { return this.registroEForm.get('nombre'); }
    get direccion_feed() { return this.registroEForm.get('direccion'); }
    get direccion2_feed() { return this.registroEForm.get('direccion2'); }
    get urlmap_feed() { return this.registroEForm.get('urlmap'); }
 
  
    registroEForm: FormGroup;
    an_request:any;
    an_response:any;
    tablachile : Array<any> = [];
    tablaecuador: Array<any> = [];
  constructor(private formBuilder: FormBuilder,private jumpservice: JumpqService,private loggin:AuthService) { }





  ngOnInit(): void {
  this.panelPrincipal = true;
  
  this.registroEForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required,Validators.maxLength(32),Validators.minLength(4)]],
      direccion: ['', [Validators.required,Validators.maxLength(32),Validators.minLength(4)]],
      direccion2: ['', [Validators.required]],
      urlmap: ['', [Validators.required,Validators.maxLength(32),Validators.minLength(8)]]
    }
  )




  }
  
  panelsucursal(){
    this.panelPrincipal = false;
    this.panelcrearsucursal = true;
  } 
  panelsucursalE(){
    this.panelPrincipal = false;
    this.panelcrearsucursalE = true;
  }
  panelConfSucursal(){
    this.panelPrincipal = false;
    this.paneltablaconfigurarSucursal = true;
    this.cargartablachile();
  }
  salir(){
    this.panelPrincipal = true;
    this.panelcrearsucursal = false;
    this.panelcrearsucursalE = false;
    this.paneltablaconfigurarSucursal = false;
    this.paneltablamodificarSucursal = false;
  }

  panelModfSucursal(){
    this.paneltablamodificarSucursal=true;
    this.panelPrincipal = false;
    this.cargartablachile();
  }


  cargartablachile(){
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
}
