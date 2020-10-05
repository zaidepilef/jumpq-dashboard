import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Chart } from 'node_modules/chart.js'
import { from } from 'rxjs';
import { JumpqService } from '../../services/jumpq.service'
import * as XLSX from 'xlsx'; 
@Component({
    selector: 'app-branch-charts',
    templateUrl: './branch-charts.component.html',
    styleUrls: ['./branch-charts.component.sass']
})
export class BranchChartsComponent implements OnInit {

    constructor(private jumpservice: JumpqService) { }
    an_request: any;
    an_response: any;
    surcusal: any;
    ejecutivo: any;
    sucursalcount: Array<any>;
    horaspendientes : any;
    horascompletadas :any;
    horas : Array<any> =[{
        pendientes : "",
        completadas : ""
    }];
    detalles : any;
    prueba:boolean;
    ConsultaSucursal: boolean;
    ConsultaSucursaldetalle : boolean;
    graficos : boolean;
    ngOnInit(): void {
        this.cargarSucursal();
        this.horasCount();
        this.cargaEjecutivos();
        this.graficos = true; 
    }

    volver(){
        this.ConsultaSucursaldetalle =false;
        this.graficos = true;
        this.ConsultaSucursal=false;  
    }
  exportExcelTablesucursal(){
    var fileName= 'sucursales.xlsx';
    /* table id is passed over here */   
    let element = document.getElementById('sucursalexcel'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  exportExcelTablesucursaldetalle(){
    var fileName= 'sucursalesDetalle.xlsx';
    /* table id is passed over here */   
    let element = document.getElementById('sucursaldetalle'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

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
                this.surcusal = this.an_response;
                console.info(this.an_response);
                this.sucursalesConteo();
            }

            , err => console.error(err)
        );
    }
    test(){
        this.ConsultaSucursal=true;
    };

    detallegridone(data : any){
    
    this.an_request = {
        id: 8,
        name:data.sucursal
    };
    this.jumpservice.Consultadetalle(this.an_request).subscribe(
        res => {
            this.an_response = res;
            this.detalles = this.an_response;
            this.ConsultaSucursaldetalle =true;
            this.graficos = true;
            this.ConsultaSucursal=false;
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
            } 

            , err => console.error(err)
        );

        this.jumpservice.horaspendientes(this.an_request).subscribe(
            res => {
                this.an_response = res;
                console.info(res);
            this.horas[0].pendientes = this.an_response.Pendientes.conteoP;
            this.horasConteo();
            }

            , err => console.error(err)
        );
        

        
    }
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

        var datasets2 = this.surcusal.sucursal.map(item => {
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
                label: ['Horas completdas','Horas pendientes'],
                data: [item.completadas,item.pendientes],
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
                labels: ['Turnos Completados','Turnos Pendientes'],
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

}
