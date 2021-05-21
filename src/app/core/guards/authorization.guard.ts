import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let path = route.routeConfig.path;

    if(path == 'dashboard' && this.authService.isUserAdministrator()) {
      return true;
    }
    if(path == 'usuarios' && this.authService.isUserITOrHigher()) {
      return true;
    } 
    if(path == 'clientes' && this.authService.isUserSellerOrHigher()) {
      return true;
    }
    this.router.navigate(['not-found'])
    return false;
  }
  
}
