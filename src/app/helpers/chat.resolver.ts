import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { ChatService } from '../services/chat.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
// Post[] => type de données qui sera récupéré
export class ChatResolver implements Resolve<User[]> {

  constructor(private _chatService: ChatService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<User[]> {


    // return of(true);
    return this._chatService.getMsgSentObs()

  }


}
