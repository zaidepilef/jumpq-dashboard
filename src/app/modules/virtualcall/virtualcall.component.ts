import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JumpqService } from '../../services/jumpq.service';

@Component({
  selector: 'app-virtualcall',
  templateUrl: './virtualcall.component.html',
  styleUrls: ['./virtualcall.component.sass']
})
export class VirtualcallComponent implements OnInit {
  panelPrincipal: boolean;
  PanelEjecutivo: boolean;
  panelconfE: boolean;
  an_response: any;
  an_request: any;
  ejecutivos: Array<any> = [];
  ejecutivoSeleccionado: any = "";
  PanelMedio: boolean;
  PanelMedioModificar: boolean;
  medios: Array<any> = [];
  registroEForm: FormGroup;
  medioscontacto = {
    nombre: "",
    estado: 0,
    id: 0
  }
  medioReset = {
    nombre: "",
    estado: 0,
    id: 0
  }
  tipodemedio: any;
  user: any = {
    name: "",
    company: ""
  };
  tipomedio = 0;
  resultadoMedio: boolean;
  crearmedio: boolean = false;
  resultadoMediocreate: boolean = false;
  resultadoMedioerror: boolean = false;
  PanelGestionE: boolean = false;
  panelGestionEjecutivo: boolean = false;

  registro: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    email: "",
    estado: 0,
    tipo: 3,
    registroEForm: {},
    id: 0
  };
  reset: any = {
    nombre: "",
    apellidos: "",
    rut: "",
    email: "",
    estado: 0,
    tipo: 3,
    registroEForm: {},
    id: 0
  };
  horarioFormat: any = {
    id: "",
    sucursal: 0,
    medio: 0,
    mail: "",
    format: 0,
    horaIMañana: 0,
    horaTMañana: 0,
    horaItarde: 0,
    horaTtarde: 0,
    turno: 1,
    Days1: false,
    Days2: false,
    Days3: false,
    Days4: false,
    Days5: false,
    Days6: false,
    Days7: false
  }
  ejecutivomail: any = "";
  emailcheckfail: boolean = false;
  resultado: boolean = false;
  newEjecutivo: boolean = false;
  resultadoModificar: boolean = false;
  tipomensaje: any = "";
  Configurarhorario: boolean = false;
  sucursal: Array<any> = [];
  formathour: Array<any> = [];
  Horario1: Array<any> = [];
  Horario2: Array<any> = [];
  Horario3: Array<any> = [];
  Horario4: Array<any> = [];
  resulterror: boolean;
  errorhorario: string;
  resultcrear: boolean;
  newConfig: boolean;
  resultadomodifcar: boolean;
  configuracion: any;
  formato: any;
  drop1: any;
  registroMForm: FormGroup;
  eliminarejecutivo: boolean;
  paneleliminar: boolean;
  loadingpanel: boolean;
  get name_feed() { return this.registroMForm.get('nombre'); }

  get nameE_feed() { return this.registroEForm.get('name'); }
  get lastname_feed() { return this.registroEForm.get('lastname'); }
  get rut_feed() { return this.registroEForm.get('rut'); }
  get email_feed() { return this.registroEForm.get('email'); }


  constructor(private formBuilder: FormBuilder, private jumpservice: JumpqService, private loggin: AuthService) { }

  ngOnInit(): void {

    this.panelPrincipal = true;
    this.loaduser();
    this.formmedio();
    this.formcheckusuario();
  }

  formcheckusuario() {
    this.registroEForm = this.formBuilder.group(
      {
        name: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        lastname: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
        rut: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }

  CrearEjecutivo() {
    this.registro = this.reset;
    this.PanelGestionE = false;
    this.formcheckusuario();
    this.panelGestionEjecutivo = true;
    this.newEjecutivo = true;
    this.tipomensaje = "Crear Nuevo Ejecutivo";
  }

  RegistrarEjecutivo() {
    this.emailcheckfail = false;


    if (this.newEjecutivo == true) {
      this.an_request = {
        nombre: this.registro.nombre,
        apellidos: this.registro.apellidos,
        type: this.registro.tipo,
        rut: this.registro.rut,
        status: this.registro.estado,
        email: this.registro.email,
        company: this.user.company
      }
      this.jumpservice.newejecutivo(this.an_request).subscribe(
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

    } else {
      this.an_request = {
        nombre: this.registro.nombre,
        apellidos: this.registro.apellidos,
        type: this.registro.tipo,
        rut: this.registro.rut,
        status: this.registro.estado,
        email: this.registro.email,
        company: this.user.company,
        id: this.registro.id
      }
      if (this.ejecutivomail == this.registro.email) {

        this.jumpservice.modificarjecutivo(this.an_request).subscribe(
          res => {
            this.an_response = res;

            if (this.an_response.status == "OK") {

              this.resultadoModificar = true;

            }
          },
          err => console.warn('err : ', err)

        );


      } else {
        this.jumpservice.modificarjecutivo2(this.an_request).subscribe(
          res => {
            this.an_response = res;

            if (this.an_response.status == "OK") {

              this.resultadoModificar = true;

            } if (this.an_response.status == "NOOK") {
              this.emailcheckfail = true;
            }
          },
          err => console.warn('err : ', err)

        );

      }


    }
  }


  CrearHorario() {
    this.Configurarhorario = true;
  }


  buscarSucursal() {

  }

  buscarmedio() {

  }



  formmedio() {
    this.registroMForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(4)]],
      }
    )
  }
  loaduser() {
    this.loadingpanel=true;
    this.panelPrincipal=false;
    
    var usersend = {
      data: this.loggin.GetToken()
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

  configurarEjecutivo() {

    this.panelPrincipal = false;

    this.an_request = {
      company: this.user.company

    };
    this.jumpservice.getejecutivoslist(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.ejecutivos = this.an_response.user;


        this.PanelEjecutivo = true;


      }

      , err => console.error(err)
    );

  }


  ConfigurarAgendamiento(data: any) {

    this.ejecutivoSeleccionado = data.name;
    this.horarioFormat.mail = data.email;


    this.resultadomodifcar = false;
    this.resultcrear = false;

    this.Configurarhorario = true;
    this.PanelEjecutivo = false;
    this.buscarConf(data.email);
    this.cargarSucursal();
    this.cargarmedio();
    this.cargarformato();
  }

  buscarConf(event: any) {
    this.Horario1 = [];
    this.Horario2 = [];
    this.Horario3 = [];
    this.Horario4 = [];
    this.an_request = {
      email: event
    };
    this.horarioFormat.turno = 1;
    this.jumpservice.buscarConfejecutivo(this.an_request).subscribe(
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
          this.horarioFormat.sucursal = this.configuracion.branch_id;
          this.horarioFormat.medio = this.configuracion.id_solicitud;
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
  cargarSucursal() {

    this.an_request = {
      company: this.user.company
    };
    this.jumpservice.buscarsucusal(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.sucursal = this.an_response.branch;

      }

      , err => console.error(err)
    );

  }
  cargarmedio() {
    this.an_request = {
      id: this.user.company

    };
    this.jumpservice.medios(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.medios = this.an_response.medios;

      }

      , err => console.error(err)
    );
  }
  cargarformato() {
    this.an_request = {
      id: this.user.company

    };
    this.jumpservice.formatohora(this.an_request).subscribe(
      res => {
        this.an_response = res;
        this.formathour = this.an_response.hora
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



  guardarSucursal(event: any) {
    this.horarioFormat.sucursal = event;

  }
  guardarmedios(event: any) {
    this.horarioFormat.medio = event;

  }
  guardardatos(event: any) {
    this.horarioFormat.horaTtarde = event;

  }

  GenerarHorario() {
    this.resulterror = false;
    this.resultadomodifcar = false;
    this.resultcrear = false;
    this.an_request = {
      id: this.configuracion.ejecutivo_id,
      company: this.user.company,
      sucursal: this.horarioFormat.sucursal,
      email: this.horarioFormat.mail,
      medio: this.horarioFormat.medio,
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
      //
      if (this.horarioFormat.sucursal > 0) {
        if (this.horarioFormat.medio > 0) {
          if (this.horarioFormat.turno > 0) {


            if (this.horarioFormat.format > 0) {
              if (this.horarioFormat.horaIMañana > 0 && this.horarioFormat.horaTMañana > 0 && this.horarioFormat.horaItarde > 0 && this.horarioFormat.horaTtarde > 0) {

                if (this.horarioFormat.Days1 == true || this.horarioFormat.Days2 == true || this.horarioFormat.Days3 == true || this.horarioFormat.Days4 == true || this.horarioFormat.Days5 == true || this.horarioFormat.Days6 == true || this.horarioFormat.Days7 == true) {


                  this.jumpservice.ActualizarHorarioEjecutivo(this.an_request).subscribe(
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
          this.resulterror = true;
          this.errorhorario = "Seleccione un medio de contacto para continuar";
        }
      } else {
        this.resulterror = true;
        this.errorhorario = "Seleccione una Sucursal para continuar";
      }
    }
    //
    else {
      if (this.horarioFormat.sucursal > 0) {
        if (this.horarioFormat.medio > 0) {
          if (this.horarioFormat.turno > 0) {


            if (this.horarioFormat.format > 0) {
              if (this.horarioFormat.horaIMañana > 0 && this.horarioFormat.horaTMañana > 0 && this.horarioFormat.horaItarde > 0 && this.horarioFormat.horaTtarde > 0) {

                if (this.horarioFormat.Days1 == true || this.horarioFormat.Days2 == true || this.horarioFormat.Days3 == true || this.horarioFormat.Days4 == true || this.horarioFormat.Days5 == true || this.horarioFormat.Days6 == true || this.horarioFormat.Days7 == true) {

                  this.jumpservice.crearHorarioEjecutivo(this.an_request).subscribe(
                    res => {
                      this.an_response = res;
                      if (this.an_response.status == "OK") {
                        this.resultcrear = true;
                        this.newConfig = false;
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
          this.resulterror = true;
          this.errorhorario = "Seleccione un medio de contacto para continuar";
        }


      } else {
        this.resulterror = true;
        this.errorhorario = "Seleccione una Sucursal para continuar";
      }
    }
  }

  salir() {
    this.panelPrincipal = true;
    this.PanelEjecutivo = false;
    this.panelconfE = false;
    this.PanelMedio = false;
    this.PanelMedioModificar = false;
    this.PanelGestionE = false;
    this.panelGestionEjecutivo = false;
    this.Configurarhorario = false;
    this.paneleliminar = false;
  }


  crearMedio() {

    this.PanelMedio = false;
    this.crearmedio = true;
    this.medioscontacto = this.medioReset;
    this.tipodemedio = "Crear medio de contacto";
    this.formmedio();
    this.PanelMedioModificar = true;
  }
  configurarMedio() {
    this.panelPrincipal = false;
    this.PanelMedio = true;

    this.an_request = {
      id: this.user.company
    };


    this.jumpservice.medios(this.an_request).subscribe(
      res => {
        this.an_response = res;
        if (this.an_response.status == "OK") {
          this.medios = this.an_response.medios;
          for (var i = 0; i < this.medios.length; i++) {
            if (this.medios[i].status == 1) {
              this.medios[i].status = "Activa";
            } else {
              this.medios[i].status = "Desactivada";
            }
          }
        }else{
          this.an_request = {
            company: this.user.company
          };
          this.inicializar(this.an_request);
        }
      }

      , err => console.error(err)
    );
  }

  inicializar(event : any){

    this.jumpservice.crearMedio(event).subscribe(
      res => {
        this.an_response = res;
        if(this.an_response.status == "OK"){
          this.configurarMedio();
        }
        
      }

      , err => console.error(err)
    );

  }


  ModificarMedio(event: any) {
    this.tipodemedio = "Modificar Medio de contacto";
    this.resultadoMedioerror = false;
    this.PanelMedio = false;
    this.PanelMedioModificar = true;
    this.crearmedio = false;
    if (event.status == "Activa") {
      this.medioscontacto.estado = 1
    } else {
      this.medioscontacto.estado = 2
    }
    this.medioscontacto.nombre = event.meet_name;
    this.medioscontacto.id = event.meet_configId;
    this.resultadoMedio = false;

  }
  tipo(event: any) {
    this.medioscontacto.estado = event;
  }
  tipo2(event: any) {
    this.registro.estado = event;
  }

  EliminarEjecutivo() {
    if (confirm("¿Esta seguro que desea borrar este ejecutivo?")) {
      this.an_request = {
        user: this.registro.id,
        email: this.registro.email
      };
      this.jumpservice.HorarioEjecutivo(this.an_request).subscribe(
        res => {
          this.an_response = res;
        }

        , err => console.error(err)
      );
      this.jumpservice.EliminarEjecutivo(this.an_request).subscribe(
        res => {
          this.an_response = res;
          this.panelGestionEjecutivo = false;
          this.paneleliminar = true;
        }

        , err => console.error(err)
      );
    }
  }
  GestionarE() {

    this.panelPrincipal = false;

    this.an_request = {
      company: this.user.company

    };
    this.jumpservice.getejecutivoslist(this.an_request).subscribe(
      res => {
        this.an_response = res;

        this.ejecutivos = this.an_response.user;
        this.PanelGestionE = true;
        this.eliminarejecutivo = false;


      }

      , err => console.error(err)
    );
  }

  ModificarMedioFinal(event: any) {

  }

  gestionejecutivo(event: any) {

    this.PanelGestionE = false;
    this.registro.nombre = event.name;
    this.registro.apellidos = event.last_name;
    this.registro.rut = event.identification_card;
    this.registro.email = event.email;
    this.registro.estado = event.status;
    this.registro.id = event.user_id;
    this.ejecutivomail = event.email;
    this.panelGestionEjecutivo = true;
    this.resultadoModificar = false;
    this.emailcheckfail = false;
    this.eliminarejecutivo = true;
    this.tipomensaje = "Modificar Ejecutivo";
  }
  generarMedio() {
    this.resultadoMedioerror = false;

    if (this.medioscontacto.estado > 0) {


      if (this.crearmedio == true) {
        this.an_request = {
          company: this.user.company,
          nombre: this.medioscontacto.nombre,
          tipo: this.medioscontacto.estado
        }
        this.jumpservice.crearMedio(this.an_request).subscribe(
          res => {
            this.an_response = res;

            if (this.an_response.status == "OK") {
              this.resultadoMediocreate = true;
              this.medioscontacto.nombre = "";
              this.medioscontacto.estado = 0;
              this.formmedio();
            }


          }

          , err => console.error(err)
        );
      } else {
        this.an_request = this.medioscontacto;
        this.jumpservice.modificarMedio(this.an_request).subscribe(
          res => {
            this.an_response = res;

            if (this.an_response.status == "OK") {
              this.resultadoMedio = true;
            }


          }

          , err => console.error(err)
        );
      }

    } else {
      this.resultadoMedioerror = true;
    }
  }
}
