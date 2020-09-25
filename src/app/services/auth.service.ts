import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';



@Injectable({
	providedIn: 'root'
})


export class AuthService {

	user: User;
	constructor(public jwtHelper: JwtHelperService, private httpClient: HttpClient) { }


	public login(data: User) {

		return this.httpClient.post(`${environment.API_URL}/authenticate/login/`, data);

	}

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('token');
		// Check whether the token is expired and return
		// true or false
		return !this.jwtHelper.isTokenExpired(token);
	}


}
