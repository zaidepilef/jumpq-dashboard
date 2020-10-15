import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Injectable({
	providedIn: 'root'
})

export class JumpqService {
	private SERVER_URL = "http://localhost:8080/api";
	constructor(private httpClient: HttpClient) { }

	public getSucursal(id: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/Sucursalvisitas/`,id);
	  }

	  public getSucursalCount(id: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/SucursalvisitasCount/`,id);
	  }

	  public horaspendientes(id: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/cantidadConsultasPendientes/`,id);
	  }

	  public horascompletadas(id: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/cantidadConsultasCompletadas/`,id);
	  }

	  public Consultaejecutivo(id: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/consultasEjecutivos/`,id);
	  }
	  
	  public Consultadetalle(data: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/consultasdetalle/`,data);
	  }
	  
	  public cantidadusuarios(data: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/cantidadusuarios/`,data);
	  }

  public detalleCantidadclientes(data: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/cantidadusuariosdetalle/`,data);
	  }
	  public estadohoraSolicitadas(data: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/estadohoraSolicitadas/`,data);
	  }
	  public detalleejecutivo(data: any) {
		return this.httpClient.post(`${this.SERVER_URL}/branchSettings/detalleejecutivo/`,data);
	  }
	  public userdata(data: any) {
		return this.httpClient.post(`${this.SERVER_URL}/companies/userdata/`,data);
	  }

	  public modificarlist(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/user/modificarlist/`,data);
	  }
	  public getmail() {
		return this.httpClient.get(`${environment.API_URL_LOCAL}/dashboard/userdata`);
	  }
	
}
