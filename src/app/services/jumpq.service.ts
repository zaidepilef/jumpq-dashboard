import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Injectable({
	providedIn: 'root'
})

export class JumpqService {

	constructor(private httpClient: HttpClient) { }

	public getUserData() {
		return this.httpClient.get(`${environment.API_URL_LOCAL}/dashboard/userdata/`);
	}

	public getSucursal(id: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/Sucursalvisitas/`, id);
	}

	public getSucursalCount(id: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/SucursalvisitasCount/`, id);
	}

	public horaspendientes(id: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/cantidadConsultasPendientes/`, id);
	}

	public horascompletadas(id: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/cantidadConsultasCompletadas/`, id);
	}

	public Consultaejecutivo(id: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/consultasEjecutivos/`, id);
	}

	public Consultadetalle(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/consultasdetalle/`, data);
	}

	public cantidadusuarios(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/cantidadusuarios/`, data);
	}

	public detalleCantidadclientes(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/cantidadusuariosdetalle/`, data);
	}

	public estadohoraSolicitadas(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/estadohoraSolicitadas/`, data);
	}

	public detalleejecutivo(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/detalleejecutivo/`, data);
	}

	public userdata(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/companies/userdata/`, data);
	}

	public modificarlist(data: any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/user/modificarlist/`, data);
	}


	public getmail() {
		return this.httpClient.get(`${environment.API_URL_LOCAL}/dashboard/userdata`);
	}


	public getsucursalchile(data :any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/sucursalChile/`,data);
	}

	public getsucursalecuador(data :any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/sucursalEcuador`,data);
	}

	public getejecutivoslist(data :any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/user/ejecutivoslist`,data);
	}

	public getBusinnes() {
		return this.httpClient.get(`${environment.API_URL_LOCAL}/business/`);
	  }




	//para crear y modificar usuario
	  public postNewUser(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/user/newUser`,data);
	  }
	  	
	  public postmodificarUser(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/user/modificarUser`,data);
	  }


	  //cargar provincia 
	  public cargarProvincia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/regions/cargardashbProvincia`,data);
	  }
	  public cargarciudad(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/provincia/cargardashbciudades`,data);
	  }
	  public cargarparroquia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/comunas/cargardashbparroquia`,data);
	  }


	  //crear sucursal
	  public crearSucursal(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/crearSucursal`,data);
	  }

}
