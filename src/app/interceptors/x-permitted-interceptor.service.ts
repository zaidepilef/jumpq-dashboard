import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class XPermittedInterceptorService implements HttpInterceptor {

    constructor() { }

    /*  
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        // console.log("interceptor: " + req.url);
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req);
    }
*/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        const headers = req.clone({
            headers: req.headers.set('X-Permitted-Cross-Domain-Policies', `none`)
        });

      
        //Referrer-Policy: strict-origin-when-cross-origin;
        return next.handle(headers);
    }
}
