import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  sucursalId: any = 0;
  registro: any = {
    company: 0,
    nombre: "",
    direccion: "",
    direccion2: "",
    comuna: 0,
    codlocalidad: "",
    urlmap: "",
    cod_prov: 0,
    cod_parr: 0
  };

  Mprovincia: any = {
    id: "",
    comuna: 0,
    codigo: 0,
    provincia: 0
  };
  pais: number;
  modeEcuador: boolean;
  modeChile: boolean;
  Modificarcomunaerror: boolean;
  modificarResultado: boolean;
  comunaerrorcrear: boolean;
  Mostrarmapa: any;
  Mostrarmapam: any;
  mostrarDatos: boolean;
  sucursaldelete: boolean = false;
  resulterror: boolean = false;
  errorhorario: string = "";
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
    turno: "",
    Days1: false,
    Days2: false,
    Days3: false,
    Days4: false,
    Days5: false,
    Days6: false,
    Days7: false
  }

  reset: any = {
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
  resultadomodifcar: boolean = false;
  resultcrear: boolean;
  constructor(private _sanitizationService: DomSanitizer, private formBuilder: FormBuilder, private jumpservice: JumpqService, private loggin: AuthService) { }





  ngOnInit(): void {
    this.loaduser();
    this.panelPrincipal = true;

    this.formload();




  }

  formload() {
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

      }, err => console.error(err)
    );
  }


  panelsucursal() {
    this.panelPrincipal = false;
    this.panelcrearsucursal = true;

    this.registro.nombre = "";
    this.registro.direccion = "";
    this.registro.direccion2 = "";
    this.registro.comuna = 0;
    this.registro.cod_prov = 0;

    this.pais = 1;

    this.cargarRegion();
  }
  panelsucursalE() {
    this.panelPrincipal = false;
    this.panelcrearsucursalE = true;
    this.pais = 2;
    this.cargarProvincia();
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
    this.sucursaldelete = false;
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
      pais: this.pais
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











  cargarRegion() {
    this.Comunas = [];
    this.provincia = [];
    this.an_request = {
      pais: this.pais
    };
    this.jumpservice.cargarRegion(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.regiones = this.an_response;
      }

      , err => console.error(err)
    );

  }


  cargarprovinciaC(event: any) {
    this.Comunas = [];
    this.provincia = [];
    this.registro.cod_prov = 0;
    this.an_request = {
      id: event
    };
    this.jumpservice.cargarProvinciaC(this.an_request).subscribe(
      res => {

        this.an_response = res;

        this.provincia = this.an_response.ciudad;
      }

      , err => console.error(err)
    );

  }

  cargarComuna(event: any) {
    this.Comunas = [];
    this.registro.cod_prov = 0;
    this.an_request = {
      id: event
    };

    this.jumpservice.cargarcomuna(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.Comunas = this.an_response;

      }

      , err => console.error(err)
    );


  }





  guardarComunaM(event: any) {

    this.registro.cod_prov = event;


  }
  guardarComuna(event: any) {

    this.registro.cod_prov = event;


  }
  cargartablachile() {

    this.panelPrincipal = false;
    this.Country = "Chile";
    this.an_request = {
      company_id: this.User.company
    };

    this.jumpservice.getsucursalchile(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.tablachile = this.an_response.sucursal;

      }

      , err => console.error(err)
    );

  }
  cargartablaecuador() {
    this.panelPrincipal = false;
    this.Country = "Ecuador";
    this.an_request = {
      email: this.User.company
    };

    this.jumpservice.getsucursalecuador(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.tablachile = this.an_response.sucursal;


      }

      , err => console.error(err)
    );

  }

  CargarMapa() {

    this.mostrarDatos = true;
    this.Mostrarmapa = this._sanitizationService.bypassSecurityTrustHtml(this.registro.urlmap);

  }
  crearnuevaSucursal() {

    this.comunaerrorcrear = false;
    this.an_request = {
      company_id: this.User.company,
      nombre: this.registro.nombre,
      dirrecion: this.registro.direccion,
      dirrecion2: this.registro.direccion2,
      COD_PROV: this.registro.cod_prov,
      cod_localidad: this.registro.cod_parr,
      urlmap: this.registro.urlmap
    }
    if (this.registro.cod_parr > 0 || this.registro.cod_prov > 0) {

      this.jumpservice.crearSucursal(this.an_request).subscribe(
        res => {
          this.an_response = res;


          this.surc_name = this.registro.nombre;
          this.registro.nombre = "";
          this.registro.dirrecion = "";
          this.registro.dirrecion2 = "";
          this.registro.cod_prov = 0;
          this.registro.cod_parr = 0;
          this.registro.urlmap = "";
          this.formload();
          if (this.pais == 1) {
            this.cargarRegion();
            this.sucursalresult = true;
          } else {
            this.cargarProvincia();
            this.sucursalresult = true;
          }
        }

        , err => console.error(err)
      );

    } else {
      this.sucursalresult = false;
      this.parroquiaerr = true;
      this.comunaerrorcrear = true;
    }

  }



  modificarSucursal(event: any) {

    this.modificarResultado = false;
    this.sucursalId = event.id;
    this.paneltablamodificarSucursal = false;
    this.panelconfigurarsucursal = true;
    this.Mprovincia.id = event.id,
      this.Mprovincia.comuna = event.comuna;
    this.Mprovincia.codigo = event.codigo;


    this.registro.nombre = event.nombre;
    this.registro.direccion = event.direccion;
    this.registro.direccion2 = event.direccion2;
    this.registro.mapa = event.mapa;

    this.an_request = {
      id: event.comuna
    };
    if (this.Country == "Ecuador") {

      this.modeEcuador = true;
      this.modeChile = false;
      this.jumpservice.Buscarprovincia(this.an_request).subscribe(
        res => {
          this.an_response = res;
          //this.tablachile = this.an_response.sucursal;

          this.Mprovincia.provincia = this.an_response.provincia.codigo;
          this.cargarProvincia();
          this.cargarCiudad(this.Mprovincia.provincia);
          this.cargarParroquia(this.Mprovincia.comuna);


        }
        , err => console.error(err)
      );
    }
    if (this.Country == "Chile") {
      this.modeChile = true;
      this.modeEcuador = false;
      this.jumpservice.BuscarRegion(this.an_request).subscribe(
        res => {
          this.an_response = res;

          //this.tablachile = this.an_response.sucursal;

          this.Mprovincia.provincia = this.an_response.provincia.codigo;
          this.cargarRegion();
          this.cargarprovinciaC(this.an_response.provincia.codigo);
          this.buscarProvincia(event.comuna);


        }

        , err => console.error(err)
      );
    }

  }

  buscarProvincia(event: any) {

    this.an_request = {
      id: event
    };

    this.jumpservice.BuscarprovinciaModificar(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.Mprovincia.codigo = this.an_response.provincia.codigo;

        this.cargarComuna(this.Mprovincia.codigo);
        this.registro.cod_prov = event;
      }

      , err => console.error(err)
    );


  }
  ConfigurarSucursalmostrar(event: any) {
    this.resultadomodifcar = false;
    this.resultcrear = false;
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
    this.horarioFormat.turno = "";
    this.jumpservice.buscarConf(this.an_request).subscribe(
      res => {
        this.an_response = res;

        if (this.an_response.status == "OK") {
          this.newConfig = false;
          this.configuracion = this.an_response.hora;

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

  ModificarSucursalM() {


    this.an_request = {
      nombre: this.registro.nombre,
      direccion: this.registro.direccion,
      direccion2: this.registro.direccion2,
      mapa: this.registro.mapa,
      comuna: this.registro.cod_prov,
      company: this.User.company,
      id: this.Mprovincia.id
    };


    if (this.registro.cod_prov > 0) {
      this.Modificarcomunaerror = false;
      this.modificarResultado = true;
      this.jumpservice.modificarSucursal(this.an_request).subscribe(
        res => {
          this.an_response = res;
        }

        , err => console.error(err)
      );
    } else {
      this.Modificarcomunaerror = true;
    }


  }

  borrarSucursal() {
    if (confirm("¿Esta seguro que desea borrar esta sucursal?")) {
      this.an_request = {
        id: this.sucursalId,
        company: this.User.company
      }
      this.jumpservice.borraSucursalespecial(this.an_request).subscribe(
        res => {

          this.jumpservice.borraSucursalconf(this.an_request).subscribe(
            res => {
              this.an_response = res;

              this.jumpservice.borraSucursal(this.an_request).subscribe(
                res => {
                  this.an_response = res;
                  if (this.an_response.status == "OK") {
                    this.panelconfigurarsucursal = false;
                    this.sucursaldelete = true;
                  }
                }

                , err => console.error(err)
              );

            }
            , err => console.error(err)
          );

        }

        , err => console.error(err)
      );


    }
  }


  GenerarHorario() {
    this.resulterror = false;
    this.resultadomodifcar = false;
    this.resultcrear = false;
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
    if (this.newConfig == false) {
      if (this.horarioFormat.turno > 0) {


        if (this.horarioFormat.format > 0) {
          if (this.horarioFormat.horaIMañana > 0 && this.horarioFormat.horaTMañana > 0 && this.horarioFormat.horaItarde > 0 && this.horarioFormat.horaTtarde > 0) {

            if (this.horarioFormat.Days1 == true || this.horarioFormat.Days2 == true || this.horarioFormat.Days3 == true || this.horarioFormat.Days4 == true || this.horarioFormat.Days5 == true || this.horarioFormat.Days6 == true || this.horarioFormat.Days7 == true) {


              this.jumpservice.ActualizarHorario(this.an_request).subscribe(
                res => {
                  this.an_response = res;
                  if (this.an_response.status == "OK") {
                    this.resultadomodifcar = true;
                  }

                }

                , err => console.error(err)
              );
            } else {
              this.resulterror = true;
              this.errorhorario = "Seleccione los dias de trabajo";
            }
          } else {

            this.resulterror = true;
            this.errorhorario = "Forme el horario de atencion para continuar";
          }
        } else {
          this.resulterror = true;
          this.errorhorario = "Seleccione un formato de horas para continuar.";
        }
      } else {
        this.resulterror = true;
        this.errorhorario = "Ingrese la cantidad de turnos en la misma hora (minimo 1)";
      }
    } else {
      if (this.horarioFormat.turno > 0) {


        if (this.horarioFormat.format > 0) {
          if (this.horarioFormat.horaIMañana > 0 && this.horarioFormat.horaTMañana > 0 && this.horarioFormat.horaItarde > 0 && this.horarioFormat.horaTtarde > 0) {

            if (this.horarioFormat.Days1 == true || this.horarioFormat.Days2 == true || this.horarioFormat.Days3 == true || this.horarioFormat.Days4 == true || this.horarioFormat.Days5 == true || this.horarioFormat.Days6 == true || this.horarioFormat.Days7 == true) {

              this.jumpservice.crearHorario(this.an_request).subscribe(
                res => {
                  this.an_response = res;
                  if (this.an_response.status == "OK") {
                    this.resultcrear = true;
                    this.newConfig =false;
                  }

                }

                , err => console.error(err)
              );

            } else {
              this.resulterror = true;
              this.errorhorario = "Seleccione los dias de trabajo";
            }
          } else {

            this.resulterror = true;
            this.errorhorario = "Forme el horario de atencion para continuar";
          }
        } else {
          this.resulterror = true;
          this.errorhorario = "Seleccione un formato de horas para continuar.";
        }
      } else {
        this.resulterror = true;
        this.errorhorario = "Ingrese la cantidad de turnos en la misma hora (minimo 1)";
      }

    }


  }





}
