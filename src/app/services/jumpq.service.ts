import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Injectable({
	providedIn: 'root'
})

export class JumpqService {

	constructor(private httpClient: HttpClient) { }

	public otro(data: User) {

		return this.httpClient.post(`${environment.API_URL}/authenticate/login/`, data);

	}
}
