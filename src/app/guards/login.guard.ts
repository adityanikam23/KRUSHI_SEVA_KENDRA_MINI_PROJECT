import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private route : Router){

  }

  canActivate(): any {
    if(localStorage.getItem("usertype")!= null){
       return true;
    }
    else{
       return this.route.navigate(['/']);
    }
  }
  
}
