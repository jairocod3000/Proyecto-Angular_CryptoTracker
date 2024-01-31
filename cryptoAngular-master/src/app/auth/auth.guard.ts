import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Este guard se encarga de verificar si el usuario está logueado o no utilizando el servicio de autenticación
// Si el usuario no está logueado, se redirige a la página de login

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any{

    let isLoggedIn = this.auth.isLogged;
    if (isLoggedIn){
      return true
    } else {
      this.router.navigate(['/login']);
    }
  }
}
