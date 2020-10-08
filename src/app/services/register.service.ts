import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  public NewUser(authData: any) {
    return this.httpClient.post(`${environment.API_URL}/authenticate/register/`, authData);
  }

  public NewUserSendEmailToVerify(data: any) {
    
    return this.httpClient.post(`${environment.API_EMAIL_URL}/emailsender/`, data);
  }

}
