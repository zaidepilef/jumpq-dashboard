import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
	providedIn: 'root'
})


export class AuthService {

	private loggedIn = new BehaviorSubject<boolean>(false);

	constructor(private httpClient: HttpClient) { }

	get isLogged(): Observable<boolean> {
		return this.loggedIn.asObservable();
	}

	Login(authData: User): Observable<UserResponse | void> {

		console.log('authData : ',authData);
		
		return this.httpClient.post<UserResponse>(`${environment.API_URL}/authenticate/login/`, authData)
			.pipe(
				map((res: UserResponse) => {
					console.log("res : ", res);
					if(res.status=='OK'){
						this.SaveToken(res.jwt);
						this.loggedIn.next(true);
					}
					return res;
				}),
				catchError((err) => this.HandleError(err))
			);
	}

	Logout(): void {
		localStorage.removeItem('token');
		this.loggedIn.next(false);
	}

	private ReadToken(): void {
		const userToken = localStorage.getItem('token');
		const isExpired = helper.isTokenExpired(userToken);
		console.log("isExpired : ",isExpired);
		if(isExpired){
			this.Logout();
		}else{
			this.loggedIn.next(true);
		}
	}

	private SaveToken(token: string): void {
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
