import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService:AuthService,
    private router:Router){

  }


  canActivate(): boolean{

    if(this.authService.LoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  
  /*
  //original desde el scaffolding
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  */


  
}
