import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Injectable({
	providedIn: 'root'
})

export class JumpqService {

	constructor(private httpClient: HttpClient) { }


	public getUserData(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/dashboard/tempdata/`, data);
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
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/sucursalChile`,data);
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


	  //cargar regiones o provincias

	  public cargarProvincia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/regions/cargardashbProvincia`,data);
	  }
	  public cargarciudad(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/provincia/cargardashbciudades`,data);
	  }
	  public cargarparroquia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/comunas/cargardashbparroquia`,data);
	  }


	  public cargarRegion(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/regions/cargardashbregion`,data);
	  }
	  public cargarProvinciaC(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/provincia/cargardashbprov`,data);
	  }
	  
	  public cargarprovinciaChile(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/provincia/cargardashbprov`,data);
	  }
	  public cargarcomuna(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/comunas/cargardashbcomuna`,data);
	  }


	  //crear sucursal
	  public crearSucursal(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/crearSucursal`,data);
	  }

	  public modificarSucursal(data : any){
		//return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/crearSucursal`,data);
	  }


	  //modificar sucursal
	  public Buscarprovincia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/regions/cargarMProvincia`,data);
	  }

	  	  //modificar sucursal
	  public formatohora(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/formatohora`,data);
	  }

	  public Horario(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/horario`,data);
	  }
	  public cargarHorario(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/horariocargar`,data);
	  }


	  //sucursales
	  public buscarConf(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/buscarConf`,data);
	  }

	  public ActualizarHorario(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/actualizarHorario`,data);
	  }
	  
	  public crearHorario(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/crearHorarioSucursal`,data);
	  }



	  //medio de contacto

	  	  
	  public medios(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/medios`,data);
	  }
	  public modificarMedio(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchSettings/mediomodificar`,data);
	  }

	  //compañia
	  public cargarcompañia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/companies/company`,data);
	  }
	  public modificarcompañia(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/companies/companyUpdate`,data);
	  }

//clave
	  public modificarpassword(data : any) {
		return this.httpClient.post(`${environment.API_URL_LOCAL}/user/changepassword`,data);
	  }


}
