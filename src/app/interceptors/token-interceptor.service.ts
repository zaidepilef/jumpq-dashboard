import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }

  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Autorization: `Bearer ${this.auth.GetToken()}`
      }
    });

    return next.handle(tokenizeReq);

  }


}
