import { GlobalHttpService } from './global-http.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends GlobalHttpService {



  //* url de base pour le backend
  urlDB = `${environment.API_URL}/api/users`



  // * envoie les infos register au backend >>>>>>>> route /register
  postUser(form: User): Observable<any> {
    return this._http.post(this.urlDB + "/register", form)
  }

  // * envoie les infos login au backend >>>>>>>>>> route /login
  postLoginUser(form: User): Observable<any> {
    return this._http.post(this.urlDB + "/login", form)
  }

  // Cette méthode permet de récupérer le token via register
  getToken(): string | null {
    // on recupere directement notre objet
    // const newTkn = JSON.parse(<string>localStorage.getItem('digichat-token'))
    // return newTkn.token
    return localStorage.getItem('token')
  }

  // * on recupere tous les infos de la personne qui se connecte
  getProfileUserCurrent(): Observable<User> {
    const headers = new HttpHeaders().append("Authorization", `Bearer ${this.getToken()}`)
    // * on recupere les infos du profile de la personne qui se connecte >>>>>>>> route profile
    return this._http.get<User>(this.urlDB + "/profile", { headers: headers })
  }


}
