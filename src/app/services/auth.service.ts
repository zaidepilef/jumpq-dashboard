import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';

const helper = new JwtHelperService();
@Injectable({
	providedIn: 'root'
})


export class AuthService {

	private loggedIn = new BehaviorSubject<boolean>(false);
	constructor(private httpClient: HttpClient, private router: Router,private spinner: NgxSpinnerService) { }

	get isLogged(): Observable<boolean> {
		return this.loggedIn.asObservable();
	}

	SignIn(authData: any) {
		return this.httpClient.post<any>(`${environment.API_URL}/authenticate/login/`, authData);
		//return this.httpClient.post(`${this.SERVER_URL}/authenticate/login/`, authData);
	}

	LoggedIn(): boolean {
		return !!localStorage.getItem('token')
	}

	GetToken() {
		return localStorage.getItem('token');
	}

	Logout(): void {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
		this.loggedIn.next(false);
		this.spinner.hide();

	}

	ForgotPassword(authData: any) {
		return this.httpClient.post<any>(`${environment.API_URL}/authenticate/forgot/`, authData);
	}

	private ReadToken(): void {
		const userToken = localStorage.getItem('token');
		const isExpired = helper.isTokenExpired(userToken);
		console.log("isExpired : ", isExpired);
		if (isExpired) {
			this.Logout();
		} else {
			this.loggedIn.next(true);
		}
	}

	SaveToken(token: string): void {
		localStorage.setItem('token', token);
		var decoded = jwt_decode(token);

		console.log('token token : ',decoded);
		//const usrioa = this.httpClient.post<any>(`${environment.API_URL}/dashboard/userdata/`);
		//console.log(usrioa):
		//const payload = jwt.verify(token, "LosPollosHermanos");
	}

	private HandleError(err): Observable<never> {
		let errorMessage = 'Adasd asdasd';
		if (err) {
			errorMessage = "Error code : " + err.message;
		}
		return throwError(errorMessage);
	}

	public isAuthenticated() {
		const token = localStorage.getItem('token');
		// Check whether the token is expired and return
		// true or false

	}


}
