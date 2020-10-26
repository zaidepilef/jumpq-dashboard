import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { JumpqService } from '../../services/jumpq.service';

@Component({
  selector: 'app-virtualcall',
  templateUrl: './virtualcall.component.html',
  styleUrls: ['./virtualcall.component.sass']
})
export class VirtualcallComponent implements OnInit {
  panelPrincipal:boolean;
  PanelEjecutivo:boolean;
  panelconfE:boolean;
  an_response:any;
  an_request:any;
  ejecutivos:Array<any>=[];
  ejecutivoSeleccionado:any = "";
  PanelMedio : boolean;
  PanelMedioModificar : boolean;
  medios :any =[];
  registroEForm: FormGroup;
  medioscontacto ={
    nombre:"",
    estado:0,
    id:0
  }
  tipomedio = 0;
  resultadoMedio : boolean;
  get name_feed() { return this.registroEForm.get('nombre'); }
  constructor(private formBuilder: FormBuilder,private jumpservice: JumpqService,private loggin:AuthService) { }

  ngOnInit(): void {
   
    this.panelPrincipal = true;

    this.registroEForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(4)]],
      }
    )
  }

  configurarEjecutivo(){
    
    this.panelPrincipal = false;

   
    this.an_request = {
      email: 8
  
  };
  this.jumpservice.getejecutivoslist(this.an_request).subscribe(
      res => {
          this.an_response = res;
          
          this.ejecutivos = this.an_response.user;
           
          console.info("Contiene",this.ejecutivos);
          this.PanelEjecutivo = true;
       
        
      }
  
      , err => console.error(err)
  );
  
    }

    
    ConfigurarAgendamiento(data : any){
      console.info(data);
      this.ejecutivoSeleccionado = data.name;
      console.info(this.ejecutivoSeleccionado);
      this.panelconfE = true;
      this.PanelEjecutivo = false;
      console.info(this.ejecutivoSeleccionado);
    }
  

  salir(){
    this.panelPrincipal = true;
    this.PanelEjecutivo = false;
    this.panelconfE = false;
    this.PanelMedio = false;
    this.PanelMedioModificar = false;
  }



  configurarMedio(){
    this.panelPrincipal = false;
    this.PanelMedio = true;

  
    this.an_request = {
      id: 8
  
  };
  this.jumpservice.medios(this.an_request).subscribe(
      res => {
          this.an_response = res;
          
          this.medios = this.an_response.medios;
          console.info(this.medios);
        
      }
  
      , err => console.error(err)
  );
  }


  ModificarMedio(event : any){
    console.info(event);
    this.PanelMedio = false;
    this.PanelMedioModificar = true;
    this.medioscontacto.estado = event.status;
    this.medioscontacto.nombre = event.meet_name;
    this.medioscontacto.id = event.meet_configId;
    console.info(this.medioscontacto.estado);
    this.resultadoMedio=false;

  }
  tipo(event : any){
  this.medioscontacto.estado = event;
  }

  ModificarMedioFinal(event : any){

  }

  generarMedio(){

     
    this.an_request = this.medioscontacto;
    console.info(this.an_request); 
    
    this.jumpservice.modificarMedio(this.an_request).subscribe(
      res => {
          this.an_response = res;
          
          if(this.an_response.status == "OK"){
            this.resultadoMedio = true;
          }
          console.info(this.an_response);
        
      }
  
      , err => console.error(err)
  ); 
  }

}
