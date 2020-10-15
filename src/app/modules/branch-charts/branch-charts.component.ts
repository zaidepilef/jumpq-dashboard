import { Component, OnInit, ɵConsole } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Chart } from 'node_modules/chart.js'
import { from } from 'rxjs';
import { JumpqService } from '../../services/jumpq.service'
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
@Component({
    selector: 'app-branch-charts',
    templateUrl: './branch-charts.component.html',
    styleUrls: ['./branch-charts.component.sass']
})
export class BranchChartsComponent implements OnInit {

    constructor(private jumpservice: JumpqService,private loggin:AuthService) { }
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
    ngOnInit(): void {
        console.info(this.loggin.GetMail());
        this.cargarSucursal();
        this.horasCount();
        this.cargaEjecutivos();
        this.cantidadusuarios();
        this.graficos = true;
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
            id: 8

        };

        this.jumpservice.getSucursal(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.surcusal = this.an_response.sucursal;

                console.info(this.an_response);
                this.sucursalesConteo();
            }

            , err => console.error(err)
        );
    }
    test() {
        this.cerrar();
        this.ConsultaSucursal = true;

    };

    detallegridone(data: any) {

        console.info("linea 99");
        this.an_request = {
            id: 8,
            name: data.sucursal
        };
        this.jumpservice.Consultadetalle(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.detalles = this.an_response.detalle;
                console.info("ACAAAA", this.an_response);
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
            id: 8
        };

        this.jumpservice.horascompletadas(this.an_request).subscribe(
            res => {
                this.an_response = res;
                console.info(res);
                this.horas[0].completadas = this.an_response.Completadas.conteoC;
                this.completadas = this.an_response.Completadas.conteoC;
            }

            , err => console.error(err)
        );

        this.jumpservice.horaspendientes(this.an_request).subscribe(
            res => {
                this.an_response = res;
                console.info(res);
                this.horas[0].pendientes = this.an_response.Pendientes.conteoP;
                this.pendientes = this.an_response.Pendientes.conteoP;
                this.horasConteo();
            }

            , err => console.error(err)
        );
    }

    cantidadusuarios() {
        this.an_request = {
            id: 8
        };

        this.jumpservice.cantidadusuarios(this.an_request).subscribe(
            res => {
                this.an_response = res;
                console.info("cantidad de usuarios", res);
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
            }

            , err => console.error(err)
        );



    }
    cantidadusuarioschart() {

        console.info(this.cantidadUsuarios);
        var cantidad: Array<any> = [];
        var fecha: Array<any> = [];


        for (var i = 0; i < this.cantidadUsuarios.length; i++) {

            fecha.push(this.cantidadUsuarios[i].dias);
            cantidad.push(this.cantidadUsuarios[i].conteo);
            console.info(fecha);
            console.info(cantidad);


        }


        console.info(fecha);

        var ctx = document.getElementById('cantidadUsuarios');
        var myChart = new Chart(ctx, {
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
    };

    cargaEjecutivos() {
        this.an_request = {
            id: 8
        };

        this.jumpservice.Consultaejecutivo(this.an_request).subscribe(
            res => {
                this.an_response = res;
                console.info(res);
                this.ejecutivo = this.an_response.ejecutivo;
                this.ejecutivosConteo();
            }

            , err => console.error(err)
        );


    }
    sucursalesConteo() {

        var datasets2 = this.surcusal.map(item => {
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
        var myChart = new Chart(ctx, {
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





    }

    horasConteo() {
        console.info(this.horas);
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
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Turnos Completados', 'Turnos Pendientes'],
                datasets: datasets2
            },
            options: {

            }
        });


    }

    ejecutivosConteo() {
        console.info(this.ejecutivo);
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
        var myChart = new Chart(ctx, {
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


    }

    showdetallehoraspendientes(ops: any) {


        this.cerrar();
        this.mostrarEstados = true
        this.monstrarop1 = false;


    }

    detallehoraspendientes(opt: any) {
        this.cerrar();
        console.info(opt);
        this.an_request = {
            company: 8,
            id: opt
        };

        this.jumpservice.estadohoraSolicitadas(this.an_request).subscribe(
            res => {
                this.an_response = res;
                this.detallePendientes = this.an_response.usuarios;
                console.info("llego aca", this.detallePendientes);
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
                console.info(this.detallePendientes);
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
        console.info(opt);
        this.an_request = {
            company: 8,
            mail: opt.mail
        };

        this.jumpservice.detalleejecutivo(this.an_request).subscribe(
            res => {
                console.info(res);
                this.an_response = res;
                this.detalleEjecutivo = this.an_response.usuarios;
                console.info(this.detalleEjecutivo);
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
                console.info(this.detalleEjecutivo);
            }

            , err => console.error(err)
        );


    }
    detalleCantidad(opt: any) {
        this.cerrar();

        this.an_request = {
            company: 8,
            mail: opt.mail
        };

        this.jumpservice.detalleejecutivo(this.an_request).subscribe(
            res => {
                console.info(res);
                this.an_response = res;
                this.detalleEjecutivo = this.an_response.usuarios;
                console.info(this.detalleEjecutivo);

                for (var i = 0; i < this.detalleEjecutivo.length; i++) {
                    var temp = this.detalleEjecutivo[i].hora
                    console.info(temp);
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
                console.info(this.detalleEjecutivo);
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
            company: 8,
            mes: opt.fecha
        };

        this.jumpservice.detalleCantidadclientes(this.an_request).subscribe(
            res => {
                console.info(res);
                this.an_response = res;
                this.detallecantidadclientes = this.an_response.usuarios;
                console.info("Contiene", this.detallecantidadclientes);
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
                console.info(this.detallecantidadclientes);
            }

            , err => console.error(err)
        );
    }

    busquedaRango() {
        var fecha1 = (<HTMLInputElement>document.getElementById("fechainicio")).value;
        var fecha2 = (<HTMLInputElement>document.getElementById("fechatermino")).value;
        var d1 = new Date(fecha1);
        var d2 = new Date(fecha2);

        if (d1 < d2) {
            console.info("FECHA CORRECTA");
            this.validarfecha = false;
        } else {
            this.validarfecha = true;
            console.info("FECHA INCORRECTA");
        }
        console.info(d1, d2);

    }

}
