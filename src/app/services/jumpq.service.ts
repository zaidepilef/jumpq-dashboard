import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Injectable({
	providedIn: 'root'
})

export class JumpqService {
	private SERVER_URL = "	'https://jumpnodeapi.azurewebsites.net/api'";
	constructor(private httpClient: HttpClient) { }

	public getSucursal(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/Sucursalvisitas/`,id);
	  }

	  public getSucursalCount(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/SucursalvisitasCount/`,id);
	  }

	  public horaspendientes(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadConsultasPendientes/`,id);
	  }

	  public horascompletadas(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadConsultasCompletadas/`,id);
	  }

	  public Consultaejecutivo(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/consultasEjecutivos/`,id);
	  }
	  
	  public Consultadetalle(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/consultasdetalle/`,data);
	  }
	  
}
