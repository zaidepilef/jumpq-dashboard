import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();
@Injectable({
	providedIn: 'root'
})


export class AuthService {

	private loggedIn = new BehaviorSubject<boolean>(false);

	constructor(private httpClient: HttpClient,private router:Router) { }
	private SERVER_URL = "http://localhost:8080/api";
	get isLogged(): Observable<boolean> {
		return this.loggedIn.asObservable();
	}

	SignIn(authData: User) {
		return this.httpClient.post<any>(`${environment.API_URL}/authenticate/login/`, authData);
		//return this.httpClient.post(`${this.SERVER_URL}/authenticate/login/`, authData);
	}

	
	LoggedIn(): boolean {
		return !!localStorage.getItem('token')
	}

	GetToken(){
		return localStorage.getItem('token');
	}

	Logout(): void {
		localStorage.removeItem('token');
		this.router.navigate(['/logout']);
		this.loggedIn.next(false);
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
