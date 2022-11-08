import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { BackendService } from 'src/app/services/backend.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _route: Router,
    private _snackBar: MatSnackBar,
    private _backend: BackendService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // * on recupere le token
    const token = BackendService.getToken()
    if (token) {
      // *
      return true;
    } else {
      this._snackBar.open("Vous n'êtes pas connecté, vous n'avez pas accès à cette page", 'ok', { verticalPosition: 'top' })
      return this._route.navigate(['login'])
    }
  }
}
