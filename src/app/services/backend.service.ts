import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GlobalHttpService } from './global-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService extends GlobalHttpService {




  //* url de base pour le backend
  urlDB =`${environment.API_URL}api/users`
  BackendService: any;
  constructor(_http: HttpClient, private _router: Router) {
    super(_http);


  }



  // * envoie les infos register au backend >>>>>>>> route /register
  postUser(form: User): Observable<any> {
    return this._http.post(this.urlDB + "/register", form)
  }

  // * envoie les infos login au backend >>>>>>>>>> route /login
  postLoginUser(form: User): Observable<any> {
    return this._http.post(this.urlDB + "/login", form)
  }

  // Cette méthode permet de récupérer le token via register
 static getToken(): string | null {
    // on recupere directement notre objet
    const newTkn = localStorage.getItem('token')
    if (newTkn) {
      return newTkn
    }

    return null

  }

  // * on recupere tous les infos de la personne qui se connecte
  getProfileUserCurrent(): Observable<User> {
    const headers = new HttpHeaders().append("Authorization", `Bearer ${BackendService.getToken()}`)
    // * on recupere les infos du profile de la personne qui se connecte >>>>>>>> route profile
    return this._http.get<User>(this.urlDB + "/profile", { headers: headers })
  }

  // *
  clearToken() {
    // * on indique quel token on clean
    localStorage.removeItem('digichat-token')
    // *on redirige sur login
    this._router.navigate((['/']))
  }


}
