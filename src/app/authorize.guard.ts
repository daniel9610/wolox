import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { JWTTokenService } from './services/jwttoken.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    public router : Router,
    public jwtTokenService : JWTTokenService,
    private authStorageService: LocalStorageService,
    ) {
}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(this.jwtTokenService.getToken() === false) {
      Swal.fire({
        title: 'Primero debes loguearte'
      });
      this.router.navigate(['login'])
    }
      return true;
  }
}
