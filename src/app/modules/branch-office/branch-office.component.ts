import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  User: any = this.loggin.GetToken();
  regiones: Array<any> = [];
  provincia: Array<any> = [];
  Comunas: Array<any> = [];
  NombreSucursal: any = {};
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
 
  Mprovincia: any = {
    comuna: "",
    codigo: "",
    provincia: ""
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
  sucursalresult: boolean;
  parroquiaerr: boolean;
  surc_name: any;
  panelconfigurarsucursal: boolean;
  Country: any = "Chile";
  ConfigurarSucursalmostar: boolean;
  newConfig: boolean;
  formathour: Array<any> = []

  configuracion: any = "";


  horarioFormat: any = {
    id: "",
    format: 0,
    horaIMañana: 0,
    horaTMañana: 0,
    horaItarde: 0,
    horaTtarde: 0,
    turno: 0,
    Days1: false,
    Days2: false,
    Days3: false,
    Days4: false,
    Days5: false,
    Days6: false,
    Days7: false
  }

  reset:any ={
    id: "",
    format: 0,
    horaIMañana: 0,
    horaTMañana: 0,
    horaItarde: 0,
    horaTtarde: 0,
    turno: 0,
    Days1: false,
    Days2: false,
    Days3: false,
    Days4: false,
    Days5: false,
    Days6: false,
    Days7: false
  }
  drop1: any;
  Horario1: Array<any> = [];
  Horario2: Array<any> = [];
  Horario3: Array<any> = [];
  Horario4: Array<any> = [];
  formato: any;
  resultadomodifcar :boolean= false;
  resultcrear :boolean;
  constructor(private formBuilder: FormBuilder, private jumpservice: JumpqService, private loggin: AuthService) { }





  ngOnInit(): void {
    this.loaduser();
    this.panelPrincipal = true;
    this.cargarProvincia();
    this.registroEForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(4)]],
        direccion: ['', [Validators.required, Validators.minLength(4)]],
        direccion2: ['', [Validators.minLength(4)]],
        urlmap: ['', [Validators.required]]
      }
    )




  }


  loaduser() {
    var usersend = {
      data: this.User
    }
    this.jumpservice.getUserData(usersend).subscribe(
      res => {
        this.an_response = res;
        this.User = this.an_response.user;
        console.info(this.User);
      }, err => console.error(err)
    );
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
    this.paneltablaconfigurarSucursal = false;
    this.panelconfigurarsucursal = false;
    this.ConfigurarSucursalmostar = false;
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
  cargarCiudad(event: any) {
    this.Comunas = [];
    this.provincia = [];
    console.info("llegando", event);
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

  cargarParroquia(event: any) {
    this.registro.cod_prov = event;
    console.info("en parroquias", event);
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

  guardarParroquia(event: any) {
    this.parroquiaerr = false;
    this.registro.cod_parr = event;

  }

  cargartablachile() {

    this.panelPrincipal = false;
    this.Country = "Chile";
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
  cargartablaecuador() {
    this.panelPrincipal = false;
    this.Country = "Ecuador";
    this.an_request = {
      email: 8
    };

    this.jumpservice.getsucursalecuador(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.tablachile = this.an_response.sucursal;
        console.info(this.tablachile);

      }

      , err => console.error(err)
    );

  }


  crearnuevaSucursal() {

    console.info(this.registro);

    this.an_request = {
      company_id: 8,
      nombre: this.registro.nombre,
      dirrecion: this.registro.direccion,
      dirrecion2: this.registro.direccion2,
      COD_PROV: this.registro.cod_prov,
      cod_localidad: this.registro.cod_parr,
      urlmap: this.registro.urlmap
    }
    if (this.registro.cod_parr > 0) {

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



    } else {
      this.sucursalresult = false;
      this.parroquiaerr = true;
    }

  }



  modificarSucursal(event: any) {
    this.paneltablamodificarSucursal = false;
    this.panelconfigurarsucursal = true;
    console.info(event.comuna, event.codigo);
    this.Mprovincia.comuna = event.comuna;
    this.Mprovincia.codigo = event.codigo;
    console.info(event);
    this.registro.nombre = event.nombre;
    this.registro.direccion = event.direccion;
    this.registro.direccion2 = event.direccion2;
    this.registro.mapa = event.mapa;

    


    this.an_request = {
      id: event.comuna
    };

    this.jumpservice.Buscarprovincia(this.an_request).subscribe(
      res => {
        this.an_response = res;

        //this.tablachile = this.an_response.sucursal;
        console.info(this.an_response.provincia.codigo);
        this.Mprovincia.provincia = this.an_response.provincia.codigo;
        this.cargarCiudad(this.an_response.provincia.codigo);
        this.cargarParroquia(this.Mprovincia.comuna);
        console.info(this.Mprovincia);

      }

      , err => console.error(err)
    );





  }

  ConfigurarSucursalmostrar(event: any) {
    this.resultadomodifcar = false;
    this.resultcrear = false;
    console.info(event);
    this.paneltablaconfigurarSucursal = false;
    this.ConfigurarSucursalmostar = true;

    this.horarioFormat = this.reset;
    this.NombreSucursal = event.nombre;
    this.horarioFormat.id = event.id;
    this.buscarConf(event.id);
    this.an_request = {
      id: event.comuna
    };

    this.jumpservice.formatohora(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.formathour = this.an_response.hora
      }

      , err => console.error(err)
    );


  }

  buscarConf(event: any) {
    this.an_request = {
      id: event
    };
    this.horarioFormat.turno = 0;
    this.jumpservice.buscarConf(this.an_request).subscribe(
      res => {
        this.an_response = res;

        if (this.an_response.status == "OK") {
          this.newConfig = false;
          this.configuracion = this.an_response.hora;
          console.info(this.configuracion);
          this.formato = this.an_response.hora.hours_format;
          this.drop1 = this.an_response.hora.hours_i_morning
          this.CargarHorario(this.formato);
          this.cargarhorario2(this.configuracion.hours_i_morning);
          this.cargarhorario3(this.configuracion.hours_e_morning);
          this.cargarhorario4(this.configuracion.hours_i_noon);
          this.horarioFormat.horaTtarde = this.configuracion.hours_e_noon;
          if (this.configuracion.day_monday == "T") {
            this.horarioFormat.Days1 = true;
          } else {
            this.horarioFormat.Days1 = false;
          }
          if (this.configuracion.day_tuesday == "T") {
            this.horarioFormat.Days2 = true;
          } else {
            this.horarioFormat.Days2 = false;
          }
          if (this.configuracion.day_wednesday == "T") {
            this.horarioFormat.Days3 = true;
          } else {
            this.horarioFormat.Days3 = false;
          }
          if (this.configuracion.day_thusrsday == "T") {
            this.horarioFormat.Days4 = true;
          } else {
            this.horarioFormat.Days4 = false;
          }
          if (this.configuracion.day_friday == "T") {
            this.horarioFormat.Days5 = true;
          } else {
            this.horarioFormat.Days5 = false;
          }
          if (this.configuracion.day_saturday == "T") {
            this.horarioFormat.Days6 = true;
          } else {
            this.horarioFormat.Days6 = false;
          }
          if (this.configuracion.day_sunday == "T") {
            this.horarioFormat.Days7 = true;
          } else {
            this.horarioFormat.Days7 = false;
          }

          this.horarioFormat.turno = this.configuracion.hours_cant;







        } else {
          this.newConfig = true;
          this.configuracion = "";
        }
      }

      , err => console.error(err)
    );
  }
  CargarHorario(event: any) {

    this.horarioFormat.format = event;
    this.an_request = {
      id: event
    };
    this.Horario4 = []
    this.Horario3 = []
    this.Horario2 = []

    this.jumpservice.Horario(this.an_request).subscribe(
      res => {
        this.an_response = res;
        console.info("Horas tiene ", this.an_response);
        this.Horario1 = this.an_response.hora

      }

      , err => console.error(err)
    );

  }

  cargarhorario2(event: any) {
    this.an_request = {
      id: this.horarioFormat.format,
      hora: event
    };
    this.horarioFormat.horaIMañana = event;
    this.Horario4 = []
    this.Horario3 = []
    this.jumpservice.cargarHorario(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.Horario2 = this.an_response.hora
      }

      , err => console.error(err)
    );

  }
  cargarhorario3(event: any) {
    this.an_request = {
      id: this.horarioFormat.format,
      hora: event
    };
    this.horarioFormat.horaTMañana = event;
    this.Horario4 = []

    this.jumpservice.cargarHorario(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.Horario3 = this.an_response.hora
      }

      , err => console.error(err)
    );

  }

  cargarhorario4(event: any) {
    this.an_request = {
      id: this.horarioFormat.format,
      hora: event
    };
    this.horarioFormat.horaItarde = event;

    this.jumpservice.cargarHorario(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.Horario4 = this.an_response.hora
      }

      , err => console.error(err)
    );

  }

  guardardatos(event: any) {
    this.horarioFormat.horaTtarde = event;
  }


  GenerarHorario() {
    this.an_request = {
      id: this.horarioFormat.id,
      format: this.horarioFormat.format,
      horaIMañana: this.horarioFormat.horaIMañana,
      horaTMañana: this.horarioFormat.horaTMañana,
      horaItarde: this.horarioFormat.horaItarde,
      horaTtarde: this.horarioFormat.horaTtarde,
      turno: this.horarioFormat.turno,
      Days1: this.horarioFormat.Days1,
      Days2: this.horarioFormat.Days2,
      Days3: this.horarioFormat.Days3,
      Days4: this.horarioFormat.Days4,
      Days5: this.horarioFormat.Days5,
      Days6: this.horarioFormat.Days6,
      Days7: this.horarioFormat.Days7
    }
    if(this.newConfig == false){

      this.jumpservice.ActualizarHorario(this.an_request).subscribe(
        res => {
          console.info(res);
          this.an_response = res;
          if(this.an_response.status == "OK"){
            this.resultadomodifcar = true;
          }
        
        }
  
        , err => console.error(err)
      );
  
    }else{
      this.jumpservice.crearHorario(this.an_request).subscribe(
        res => {
          console.info(res);
          this.an_response = res;
          if(this.an_response.status == "OK"){
            this.resultcrear = true;
          }
        
        }
  
        , err => console.error(err)
      );
    }
    
  }


  ModificarSucursalM(){
    if(this.Country == "Ecuador"){
      this.an_request ={
        nombre:this.registro.nombre,
        direccion:this.registro.nombre,
        direccion2:this.registro.nombre,
        mapa:this.registro.nombre,
        comuna:this.registro.cod_prov,
        codlocalidad:this.registro.cod_parr,
      } 
      console.info(this.registro);

      /*this.jumpservice.modificarSucursal(this.an_request).subscribe(
        res => {
          console.info(res);
          this.an_response = res;
          if(this.an_response.status == "OK"){
            this.resultcrear = true;
          }
        
        }
  
        , err => console.error(err)
      );*/

    } 
  }


}
