import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, from, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { fromJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {
  constructor(private _userService: UserService){}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<User[]> {

    return this._userService.getProfile()

  }
}
