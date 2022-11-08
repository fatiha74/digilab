import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatResolver implements Resolve<boolean> {
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {


    return of(true);

  }
}
