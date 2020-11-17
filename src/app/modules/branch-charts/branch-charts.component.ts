import { Component, OnInit, ɵConsole } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Chart } from 'node_modules/chart.js'
import { from } from 'rxjs';
import { JumpqService } from '../../services/jumpq.service'
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
@Component({
    selector: 'app-branch-charts',
    templateUrl: './branch-charts.component.html',
    styleUrls: ['./branch-charts.component.sass']
})
export class BranchChartsComponent implements OnInit {
    myChart1: Array<any> = [{}];
    myChart2: Array<any> = [{}];
    myChart3: Array<any> = [{}];
    myChart4: Array<any> = [{}];
    cargarGrafico1: boolean;
    grafico1helper: any = 0;
    fechabusqueda1: string;
    fechabusqueda2: string;
    modobusquedafecha: boolean = false;
    grafico1helper2: any = 0;
    grafico1helper3: any = 0;
    grafico1helper4: any = 0;
    Nohayresgitros2: boolean;
    ResultadoGrafico1: boolean = true;
    ResultadoGrafico2: boolean = true;
    ResultadoGrafico3: boolean = true;
    ResultadoGrafico4: boolean = true;
    resultadocomplete: boolean = false;
    resultadopendiente: boolean = false;
    errormensaje: boolean = false;
    ;

    constructor(private jumpservice: JumpqService, private loggin: AuthService) { }
    an_request: any;
    an_response: any;
    surcusal: Array<any>;
    ejecutivo: any;
    sucursalcount: Array<any>;
    horaspendientes: any;
    horascompletadas: any;
    completadas: any;
    pendientes: any;
    horas: Array<any> = [{
        pendientes: "",
        completadas: ""
    }];
    monstrarop1: boolean = true;
    detalles: Array<any>;
    prueba: boolean;
    ConsultaSucursal: boolean;
    ConsultaSucursaldetalle: boolean;
    graficos: boolean;
    cantidadUsuarios: Array<any>;
    mostrarEstados: boolean = false;
    mostrarEstadosDetalle: boolean = false;
    detallePendientes: Array<any>;
    detalleEjecutivo: Array<any>;
    Consultaejecutivos: boolean;
    Consultadetalleejecutivos: boolean;
    ConsultaCantidadHoras: boolean;
    ConsultadetalleCantidadHoras: boolean;
    detalleCantidadHoras: boolean;
    Consultacantidadusuarios: boolean;
    Consultacantidadusuariosdetalle: boolean;
    detallecantidadclientes: Array<any>;
    fecha1: any;
    validarfecha: boolean;
    User: any = this.loggin.GetToken();

    ngOnInit(): void {

        this.loaduser();
        this.cargarGrafico1 = true;
        this.graficos = true;

    }

    loaduser() {
        var usersend = {
            data: this.User
        }
        this.jumpservice.getUserData(usersend).subscribe(
            res => {
                this.an_response = res;
                this.User = this.an_response.user;


                this.errormensaje = false;
                this.cargarSucursal();
                this.horasCount();
                this.cargaEjecutivos();
                this.cantidadusuarios();
               



            }, err => console.error(err)
        );
    }

    cerrar() {
        this.ConsultaSucursaldetalle = false;
        this.ConsultaSucursal = false;
        this.mostrarEstados = false;
        this.mostrarEstadosDetalle = false;
        this.Consultaejecutivos = false;
        this.Consultadetalleejecutivos = false;
        this.ConsultaCantidadHoras = false;
        this.ConsultadetalleCantidadHoras = false;
        this.Consultacantidadusuarios = false;
        this.Consultacantidadusuariosdetalle = false;
        this.Nohayresgitros2 = false;
    }
    volver() {

    }

    exportExcelTablesucursal() {
        var fileName = 'sucursales.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('sucursalexcel');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }

    exportExcelCantidaHoras() {
        var fileName = 'cantidadhoras.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('cantidadhoras');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }
    exportExcelTablesucursaldetalle() {
        var fileName = 'sucursalesDetalle.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('sucursaldetalle');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }
    cargarSucursal() {

        this.an_request = {
            id: this.User.company

        };
        this.jumpservice.getSucursal(this.an_request).subscribe(
            res => {
                this.an_response = res;
                if (this.an_response.status == "OK") {

                    this.surcusal = this.an_response.sucursal;
                    this.ResultadoGrafico1 = true;
                    this.sucursalesConteo();
                } else {
                    this.ResultadoGrafico1 = false;
                    this.verificarMensaje();
                }

            }

            , err => console.error(err)
        );
    }

    cargarSucursalbusqueda(event: any) {

        this.jumpservice.getSucursalbusqueda(event).subscribe(
            res => {
                this.an_response = res;


                if (this.an_response.status == "OK") {

                    this.surcusal = this.an_response.sucursal;
                    this.sucursalesConteo();
                } else {
                    this.ResultadoGrafico1 = false;
                    this.verificarMensaje();
                }


            }

            , err => console.error(err)
        );
    }


    detallessucursal() {
        this.cerrar();
        this.ConsultaSucursal = true;

    };

    detallegridone(data: any) {

        this.an_request = {
            id: this.User.company,
            name: data.sucursal,
            fecha1: this.fechabusqueda1,
            fecha2: this.fechabusqueda2,
            modo: this.modobusquedafecha
        };

        this.jumpservice.Consultadetalle(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.detalles = this.an_response.detalle;
                this.cerrar();

                for (var i = 0; i < this.detalles.length; i++) {
                    var temp = this.detalles[i].hora;
                    if (this.detalles[i].estado == 1) {
                        this.detalles[i].estado = "Hora pendiente";
                    } else {
                        this.detalles[i].estado = "Hora completada";
                    }

                    if (temp.toString().length == 3) {

                        temp = [temp.toString().substring(0, 1), temp.toString().substring(1, 4)].join(':');
                        this.detalles[i].hora = temp;
                    } else {


                        temp = [temp.toString().substring(0, 2), temp.toString().substring(2, 6)].join(':');
                        this.detalles[i].hora = temp;
                    }
                }
                this.ConsultaSucursaldetalle = true;
                this.ConsultaSucursal = false;
            }

            , err => console.error(err)
        );



    }
    horasCount() {
        this.an_request = {
            id: this.User.company
        };

        this.jumpservice.horascompletadas(this.an_request).subscribe(
            res => {
                this.an_response = res;


                this.horas[0].completadas = this.an_response.Completadas.conteoC;
                this.completadas = this.an_response.Completadas.conteoC;

                this.jumpservice.horaspendientes(this.an_request).subscribe(
                    res => {
                        this.an_response = res;


                        this.horas[0].pendientes = this.an_response.Pendientes.conteoP;
                        this.pendientes = this.an_response.Pendientes.conteoP;

                        if (this.completadas > 0 || this.pendientes > 0) {
                            this.horasConteo();
                        } else {
                            this.ResultadoGrafico2 = false;
                            this.verificarMensaje();
                        }
                    }

                    , err => console.error(err)
                );



            }

            , err => console.error(err)
        );


    }

    verificarMensaje(){
        if(this.ResultadoGrafico1 == false || this.ResultadoGrafico2 == false || this.ResultadoGrafico3 == false || this.ResultadoGrafico4 == false ){
        this.errormensaje = true;
        }else{
        this.errormensaje = false;
        }
    }

    cantidadusuarios() {
        this.an_request = {
            id: this.User.company
        };

        this.jumpservice.cantidadusuarios(this.an_request).subscribe(
            res => {
                this.an_response = res;
                
                if(this.an_response.status == "OK"){
 
                this.cantidadUsuarios = this.an_response.usuarios;
                for (var i = 0; i < this.cantidadUsuarios.length; i++) {

                    switch (this.cantidadUsuarios[i].dias) {
                        case 1:
                            this.cantidadUsuarios[i].dias = "Enero";
                            break;
                        case 2:
                            this.cantidadUsuarios[i].dias = "febrero";
                            break;
                        case 3:
                            this.cantidadUsuarios[i].dias = "marzo";
                            break;
                        case 4:
                            this.cantidadUsuarios[i].dias = "abril";
                            break;
                        case 5:
                            this.cantidadUsuarios[i].dias = "mayo";
                            break;
                        case 6:
                            this.cantidadUsuarios[i].dias = "junio";
                            break;
                        case 7:
                            this.cantidadUsuarios[i].dias = "julio";
                            break;
                        case 8:
                            this.cantidadUsuarios[i].dias = "agosto";
                            break;
                        case 9:
                            this.cantidadUsuarios[i].dias = "septiembre";
                            break;
                        case 10:
                            this.cantidadUsuarios[i].dias = "octubre";
                            break;
                        case 11:
                            this.cantidadUsuarios[i].dias = "noviembre";
                            break;
                        case 12:
                            this.cantidadUsuarios[i].dias = "diciembre";
                            break;

                    }

                }
                this.cantidadusuarioschart();
            }else{
                this.ResultadoGrafico4=false;
                this.verificarMensaje();
            }
        }

            , err => console.error(err)
        );



    }
    cantidadusuarioschart() {

        var cantidad: Array<any> = [];
        var fecha: Array<any> = [];


        for (var i = 0; i < this.cantidadUsuarios.length; i++) {

            fecha.push(this.cantidadUsuarios[i].dias);
            cantidad.push(this.cantidadUsuarios[i].conteo);


        }


        var ctx = document.getElementById('cantidadUsuarios');

        if (this.myChart4[0].id == this.grafico1helper4) {

            this.myChart4[0].destroy();
            this.myChart4[0] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: fecha,
                    datasets: [{
                        label: ["Cantidad de usuarios"],
                        data: cantidad,
                        backgroundColor: [
                            'rgba(255, 100, 132, 0.2)',
                            'rgba(150, 100, 200, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 200, 132, 1)',],
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
            this.grafico1helper4 = this.myChart4[0].id;
        } else {
            this.myChart4[0] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: fecha,
                    datasets: [{
                        label: ["Cantidad de usuarios"],
                        data: cantidad,
                        backgroundColor: [
                            'rgba(255, 100, 132, 0.2)',
                            'rgba(150, 100, 200, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 200, 132, 1)',],
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
            this.grafico1helper4 = this.myChart4[0].id;
        }
    }

    cargaEjecutivos() {
        this.an_request = {
            id: this.User.company
        };

        this.jumpservice.Consultaejecutivo(this.an_request).subscribe(
            res => {
                this.an_response = res;
                if (this.an_response.status == "OK") {
                    this.ejecutivo = this.an_response.ejecutivo;
                    this.ejecutivosConteo();
                } else {
                    this.ResultadoGrafico3 = false;
                    this.verificarMensaje();
                }

            }

            , err => console.error(err)
        );


    }
    sucursalesConteo() {

        var datasets2 = [];
        datasets2 = this.surcusal.map(item => {
            return {
                label: `${item.sucursal}`,
                data: [item.conteo],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        });

        var ctx = document.getElementById('sucursal');

        if (this.myChart1[0].id == this.grafico1helper) {

            this.myChart1[0].destroy();
            this.myChart1[0] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Sucursales'],
                    datasets: datasets2
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },

                }
            });
            this.grafico1helper = this.myChart1[0].id;
        } else {


            // "destroy" the "old chart"
            this.myChart1[0] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Sucursales'],
                    datasets: datasets2
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },

                }
            });
            this.grafico1helper = this.myChart1[0].id;
        }




    }

    horasConteo() {

        var datasets2 = this.horas.map(item => {
            return {
                label: ['Horas completdas', 'Horas pendientes'],
                data: [item.completadas, item.pendientes],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'

                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }
        });

        var ctx = document.getElementById('horasAgendadas');

        if (this.myChart2[0].id == this.grafico1helper2) {

            this.myChart2[0].destroy();
            this.myChart2[0] = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Turnos Completados', 'Turnos Pendientes'],
                    datasets: datasets2
                },
                options: {

                }
            });

            this.grafico1helper2 = this.myChart2[0].id;
        } else {
            this.myChart2[0] = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Turnos Completados', 'Turnos Pendientes'],
                    datasets: datasets2
                },
                options: {

                }
            });
            this.grafico1helper2 = this.myChart2[0].id;
        }


    }

    ejecutivosConteo() {
        var datasets2 = this.ejecutivo.map(item => {
            return {
                label: item.Nombre,
                data: [item.conteo],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'

                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }
        });

        var ctx = document.getElementById('conteoejecutivo');


        if (this.myChart3[0].id == this.grafico1helper3) {

            this.myChart3[0].destroy();
            this.myChart3[0] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Ejecutivos'],
                    datasets: datasets2
                },
                options: {
                    legend: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },

                }
            });
            this.grafico1helper3 = this.myChart3[0].id;
        } else {

            this.myChart3[0] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Ejecutivos'],
                    datasets: datasets2
                },
                options: {
                    legend: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },

                }
            });
            this.grafico1helper3 = this.myChart3[0].id;

        }
    }

    showdetallehoraspendientes(ops: any) {


        this.cerrar();
        this.mostrarEstados = true
        this.monstrarop1 = false;


    }

    detallehoraspendientes(opt: any) {
        this.cerrar();
        this.an_request = {
            company: this.User.company,
            id: opt,
            fecha: this.fechabusqueda1,
            fecha2: this.fechabusqueda2,
            modo: this.modobusquedafecha
        };

        this.jumpservice.estadohoraSolicitadas(this.an_request).subscribe(
            res => {
                this.an_response = res;

                if (this.an_response.status == "OK") {
                    this.detallePendientes = this.an_response.usuarios;
                    for (var i = 0; i < this.detallePendientes.length; i++) {

                        if (this.detallePendientes[i].estado == 1) {
                            this.detallePendientes[i].estado = "Hora pendiente";
                        } else {
                            this.detallePendientes[i].estado = "Hora completada";
                        }

                        var temp = this.detallePendientes[i].hora;
                        if (temp.toString().length == 3) {

                            temp = [temp.toString().substring(0, 1), temp.toString().substring(1, 4)].join(':');
                            this.detallePendientes[i].hora = temp;
                        } else {


                            temp = [temp.toString().substring(0, 2), temp.toString().substring(2, 6)].join(':');
                            this.detallePendientes[i].hora = temp;
                        }

                    }


                    this.mostrarEstadosDetalle = true;
                    this.mostrarEstados = false
                }
                if (this.an_response.status == "NOK") {
                    this.Nohayresgitros2 = true;
                }

            }

            , err => console.error(err)
        );


    }


    mostrarejecutivos() {
        this.cerrar();
        this.Consultaejecutivos = true;
    }

    exportExcelejecutivo() {
        var fileName = 'ejecutivos.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('ejecutivosexcel');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);

    }

    exportExcelEstadosDetalle() {
        var fileName = 'estadoDetalle.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('estadoDetalle');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }

    exportExcelestados() {
        var fileName = 'estados.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('estados');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }

    exportExceldetalleEjecutivos() {
        var fileName = 'detalleEjecutivos.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('detalleEjecutivos');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }
    exportExcelcantidadUsuarios() {
        var fileName = 'cantidadClientes.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('cantidadClientes');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }
    exportExceldetallecantidadUsuarios() {
        var fileName = 'detalleCantidadClientes.xlsx';
        /* table id is passed over here */
        let element = document.getElementById('detalleCantidadClientes');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }


    detalleejecutivos(opt: any) {
        this.cerrar();
        this.an_request = {
            company: this.User.company,
            mail: opt.mail,
            fecha: this.fechabusqueda1,
            fecha2: this.fechabusqueda2,
            modo: this.modobusquedafecha
        };

        this.jumpservice.detalleejecutivo(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.detalleEjecutivo = this.an_response.usuarios;
                for (var i = 0; i < this.detalleEjecutivo.length; i++) {

                    if (this.detalleEjecutivo[i].estado == 1) {
                        this.detalleEjecutivo[i].estado = "Hora pendiente";
                    } else {
                        this.detalleEjecutivo[i].estado = "Hora completada";
                    }

                    var temp = this.detalleEjecutivo[i].hora;
                    if (temp.toString().length == 3) {

                        temp = [temp.toString().substring(0, 1), temp.toString().substring(1, 4)].join(':');
                        this.detalleEjecutivo[i].hora = temp;
                    } else {


                        temp = [temp.toString().substring(0, 2), temp.toString().substring(2, 6)].join(':');
                        this.detalleEjecutivo[i].hora = temp;
                    }



                }
                this.Consultadetalleejecutivos = true;
            }

            , err => console.error(err)
        );


    }
    detalleCantidad(opt: any) {
        this.cerrar();

        this.an_request = {
            company: this.User.company,
            mail: opt.mail
        };

        this.jumpservice.detalleejecutivo(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.detalleEjecutivo = this.an_response.usuarios;

                for (var i = 0; i < this.detalleEjecutivo.length; i++) {
                    var temp = this.detalleEjecutivo[i].hora

                    if (this.detalleEjecutivo[i].estado == 1) {
                        this.detalleEjecutivo[i].estado = "Hora pendiente";
                    } else {
                        this.detalleEjecutivo[i].estado = "Hora completada";
                    }


                    if (temp.toString().length == 3) {

                        temp = [temp.toString().substring(0, 1), temp.toString().substring(1, 4)].join(':');
                        this.detalleEjecutivo[i].hora = temp;
                    } else {


                        temp = [temp.toString().substring(0, 2), temp.toString().substring(2, 6)].join(':');
                        this.detalleEjecutivo[i].hora = temp;
                    }



                }
                this.Consultadetalleejecutivos = true;
            }

            , err => console.error(err)
        );
    }

    mostrarcantidadUsuarios() {
        this.cerrar();
        this.ConsultaCantidadHoras = true;
    }


    mostrarcantidadusuarios() {
        this.cerrar();
        this.Consultacantidadusuarios = true;
    }

    detalleCantidadclientes(opt: any) {


        this.cerrar();

        this.an_request = {
            company: this.User.company,
            mes: opt.fecha,
            fecha: this.fechabusqueda1,
            fecha2: this.fechabusqueda2,
            modo: this.modobusquedafecha
        };

        this.jumpservice.detalleCantidadclientes(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.detallecantidadclientes = this.an_response.usuarios;
                for (var i = 0; i < this.detallecantidadclientes.length; i++) {
                    var temp = this.detallecantidadclientes[i].hora;
                    if (this.detallecantidadclientes[i].estado == 1) {
                        this.detallecantidadclientes[i].estado = "Hora pendiente";
                    } else {
                        this.detallecantidadclientes[i].estado = "Hora completada";
                    }


                    if (temp.toString().length == 3) {

                        temp = [temp.toString().substring(0, 1), temp.toString().substring(1, 4)].join(':');
                        this.detallecantidadclientes[i].hora = temp;
                    } else {


                        temp = [temp.toString().substring(0, 2), temp.toString().substring(2, 6)].join(':');
                        this.detallecantidadclientes[i].hora = temp;
                    }
                    switch (this.detallecantidadclientes[i].mes) {
                        case 1:
                            this.detallecantidadclientes[i].mes = "Enero";
                            break;
                        case 2:
                            this.detallecantidadclientes[i].mes = "febrero";
                            break;
                        case 3:
                            this.detallecantidadclientes[i].mes = "marzo";
                            break;
                        case 4:
                            this.detallecantidadclientes[i].mes = "abril";
                            break;
                        case 5:
                            this.detallecantidadclientes[i].mes = "mayo";
                            break;
                        case 6:
                            this.detallecantidadclientes[i].mes = "junio";
                            break;
                        case 7:
                            this.detallecantidadclientes[i].mes = "julio";
                            break;
                        case 8:
                            this.detallecantidadclientes[i].mes = "agosto";
                            break;
                        case 9:
                            this.detallecantidadclientes[i].mes = "septiembre";
                            break;
                        case 10:
                            this.detallecantidadclientes[i].mes = "octubre";
                            break;
                        case 11:
                            this.detallecantidadclientes[i].mes = "noviembre";
                            break;
                        case 12:
                            this.detallecantidadclientes[i].mes = "diciembre";
                            break;

                    }


                }
                this.Consultacantidadusuariosdetalle = true;
            }

            , err => console.error(err)
        );
    }


    busquedaRango() {
        this.fechabusqueda1 = (<HTMLInputElement>document.getElementById("fechainicio")).value;
        this.fechabusqueda2 = (<HTMLInputElement>document.getElementById("fechatermino")).value;
        var d1 = new Date(this.fechabusqueda1);
        var d2 = new Date(this.fechabusqueda2);
        this.cerrar();
        this.an_request = {
            company: this.User.company,
            fecha: this.fechabusqueda1,
            fecha2: this.fechabusqueda2,
        }
        this.ResultadoGrafico1 = true;
        this.ResultadoGrafico2 = true;
        this.ResultadoGrafico3 = true;
        this.ResultadoGrafico4 = true;
        this.errormensaje = false;
        if (d1 < d2) {
            this.validarfecha = false;
            this.modobusquedafecha = true;
            this.cargarSucursalbusqueda(this.an_request);
            this.horasCountbusqueda(this.an_request);
            this.cargaEjecutivosbusqueda(this.an_request);
            this.cantidadusuariosbusqueda(this.an_request);
           
        } else {
            this.validarfecha = true;
        }

    }
    horasCountbusqueda(data: any) {


        this.jumpservice.horascompletadasbusqueda(data).subscribe(
            res => {
                this.an_response = res;



                this.horas[0].completadas = this.an_response.Completadas.conteoC;
                this.completadas = this.an_response.Completadas.conteoC;


                this.jumpservice.horaspendientesbusqueda(data).subscribe(
                    res => {
                        this.an_response = res;


                        this.horas[0].pendientes = this.an_response.Pendientes.conteoP;
                        this.pendientes = this.an_response.Pendientes.conteoP;


                        if (this.completadas > 0 || this.pendientes > 0) {
                            this.horasConteo();
                        } else {
                            this.ResultadoGrafico2 = false;
                            this.verificarMensaje();
                        }


                    }

                    , err => console.error(err)
                );
            }


            , err => console.error(err)
        );
    }


    cargaEjecutivosbusqueda(data: any) {

        this.jumpservice.Consultaejecutivobusqueda(data).subscribe(
            res => {
                this.an_response = res;
                
                if (this.an_response.status == "OK") {
                    this.ejecutivo = this.an_response.ejecutivo;
                    this.ejecutivosConteo();
                } else {
                    this.ResultadoGrafico3 = false;
                    this.verificarMensaje();
                }



            }

            , err => console.error(err)
        );


    }

    cantidadusuariosbusqueda(data: any) {


        this.jumpservice.cantidadusuariosbusqueda(data).subscribe(
            res => {
                this.an_response = res;
                if (this.an_response.status =="OK") {

                    this.cantidadUsuarios = this.an_response.usuarios;

                    for (var i = 0; i < this.cantidadUsuarios.length; i++) {

                        switch (this.cantidadUsuarios[i].dias) {
                            case 1:
                                this.cantidadUsuarios[i].dias = "Enero";
                                break;
                            case 2:
                                this.cantidadUsuarios[i].dias = "febrero";
                                break;
                            case 3:
                                this.cantidadUsuarios[i].dias = "marzo";
                                break;
                            case 4:
                                this.cantidadUsuarios[i].dias = "abril";
                                break;
                            case 5:
                                this.cantidadUsuarios[i].dias = "mayo";
                                break;
                            case 6:
                                this.cantidadUsuarios[i].dias = "junio";
                                break;
                            case 7:
                                this.cantidadUsuarios[i].dias = "julio";
                                break;
                            case 8:
                                this.cantidadUsuarios[i].dias = "agosto";
                                break;
                            case 9:
                                this.cantidadUsuarios[i].dias = "septiembre";
                                break;
                            case 10:
                                this.cantidadUsuarios[i].dias = "octubre";
                                break;
                            case 11:
                                this.cantidadUsuarios[i].dias = "noviembre";
                                break;
                            case 12:
                                this.cantidadUsuarios[i].dias = "diciembre";
                                break;

                        }

                    }
                    this.cantidadusuarioschart();
                }else{
                   this.ResultadoGrafico4=false;
                   this.verificarMensaje();
                }


            }

            , err => console.error(err)
        );



    }



}

