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
		return this.httpClient.post(`${environment.API_URL}/dashboard/tempdata/`, data);
	}

	public getSucursal(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/Sucursalvisitas/`, id);
	}
	public getSucursalbusqueda(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/Sucursalvisitasbusqueda/`, id);
	}
	public getSucursalCount(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/SucursalvisitasCount/`, id);
	}

	public horaspendientes(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadConsultasPendientes/`, id);
	}
	public horaspendientesbusqueda(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadConsultasPendientesB/`, id);
	}

	public horascompletadas(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadConsultasCompletadas/`, id);
	}

	public horascompletadasbusqueda(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadConsultasCompletadasB/`, id);
	}
	public Consultaejecutivo(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/consultasEjecutivos/`, id);
	}
	public Consultaejecutivobusqueda(id: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/consultasEjecutivosbusqueda/`, id);
	}

	public Consultadetalle(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/consultasdetalle/`, data);
	}

	public cantidadusuarios(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadusuarios/`, data);
	}
	public cantidadusuariosbusqueda(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadusuariosbusqueda/`, data);
	}

	public detalleCantidadclientes(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/cantidadusuariosdetalle/`, data);
	}

	public estadohoraSolicitadas(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/estadohoraSolicitadas/`, data);
	}

	public detalleejecutivo(data: any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/detalleejecutivo/`, data);
	}

	public userdata(data: any) {
		return this.httpClient.post(`${environment.API_URL}/companies/userdata/`, data);
	}

	public modificarlist(data: any) {
		return this.httpClient.post(`${environment.API_URL}/user/modificarlist/`, data);
	}


	public getmail() {
		return this.httpClient.get(`${environment.API_URL}/dashboard/userdata`);
	}


	public getsucursalchile(data :any) {
		return this.httpClient.post(`${environment.API_URL}/branchs/sucursalChile`,data);
	}

	public getsucursalecuador(data :any) {
		return this.httpClient.post(`${environment.API_URL}/branchs/sucursalEcuador`,data);
	}

	public getejecutivoslist(data :any) {
		return this.httpClient.post(`${environment.API_URL}/user/ejecutivoslist`,data);
	}

	public getBusinnes() {
		return this.httpClient.get(`${environment.API_URL}/business/`);
	  }




	//para crear y modificar usuario
	  public postNewUser(data : any) {
		return this.httpClient.post(`${environment.API_URL}/user/newUser`,data);
	  }
	  	
	  public postmodificarUser(data : any) {
		return this.httpClient.post(`${environment.API_URL}/user/modificarUser`,data);
	  }


	  //cargar regiones o provincias

	  public cargarProvincia(data : any) {
		return this.httpClient.post(`${environment.API_URL}/regions/cargardashbProvincia`,data);
	  }
	  public cargarciudad(data : any) {
		return this.httpClient.post(`${environment.API_URL}/provincia/cargardashbciudades`,data);
	  }
	  public cargarparroquia(data : any) {
		return this.httpClient.post(`${environment.API_URL}/comunas/cargardashbparroquia`,data);
	  }
	

	  public cargarRegion(data : any) {
		return this.httpClient.post(`${environment.API_URL}/regions/cargardashbregion`,data);
	  }
	  public cargarProvinciaC(data : any) {
		return this.httpClient.post(`${environment.API_URL}/provincia/cargardashbprov`,data);
	  }
	  
	  public cargarprovinciaChile(data : any) {
		return this.httpClient.post(`${environment.API_URL}/provincia/cargardashbprov`,data);
	  }

	  public BuscarprovinciaModificar(data : any) {
		return this.httpClient.post(`${environment.API_URL}/provincia/buscarprovincia`,data);
	  }

	  public cargarcomuna(data : any) {
		return this.httpClient.post(`${environment.API_URL}/comunas/cargardashbcomuna`,data);
	  }
	  

	  //crear sucursal
	  public crearSucursal(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchs/crearSucursal`,data);
	  }

	  public modificarSucursal(data : any){
		return this.httpClient.post(`${environment.API_URL_LOCAL}/branchs/modifSucursal`,data);
	  }


	  //modificar sucursal
	  public Buscarprovincia(data : any) {
		return this.httpClient.post(`${environment.API_URL}/regions/cargarMProvincia`,data);
	  }

	  public BuscarRegion(data : any) {
		return this.httpClient.post(`${environment.API_URL}/regions/cargarMRegions`,data);
	  }
	  	  //modificar sucursal
	  public formatohora(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/formatohora`,data);
	  }

	  public Horario(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/horario`,data);
	  }
	  public cargarHorario(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/horariocargar`,data);
	  }


	  //sucursales
	  public buscarConf(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/buscarConf`,data);
	  }

	  public ActualizarHorario(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/actualizarHorario`,data);
	  }
	  
	  public crearHorario(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/crearHorarioSucursal`,data);
	  }



	  //medio de contacto

	  	  
	  public medios(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/medios`,data);
	  }
	  public modificarMedio(data : any) {
		return this.httpClient.post(`${environment.API_URL}/branchSettings/mediomodificar`,data);
	  }

	  //compañia
	  public cargarcompañia(data : any) {
		return this.httpClient.post(`${environment.API_URL}/companies/company`,data);
	  }
	  public modificarcompañia(data : any) {
		return this.httpClient.post(`${environment.API_URL}/companies/companyUpdate`,data);
	  }

	  

//clave
	  public modificarpassword(data : any) {
		return this.httpClient.post(`${environment.API_URL}/user/changepassword`,data);
	  }


}
