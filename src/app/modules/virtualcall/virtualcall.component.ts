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
  ejecutivoSeleccionado:any;
  constructor(private formBuilder: FormBuilder,private jumpservice: JumpqService,private loggin:AuthService) { }

  ngOnInit(): void {
   
    this.panelPrincipal = true;
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
      this.panelconfE = true;
      console.info(this.ejecutivoSeleccionado);
    }
  

  salir(){
    this.panelPrincipal = true;
    this.PanelEjecutivo = false;
    this.panelconfE = false;
  }






}
