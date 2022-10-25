import { Observable, Subject, map } from 'rxjs'

import { Directory } from '../models/directory-model';
import { GlobalHttpService } from './global-http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApiUser } from './../models/response-api-user';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalHttpService {

  reponses!: []
  // observable qui permet de souscrire
  currentUser = new Subject<User>()
  // on initialise l'api
  // urlPost = 'https://reqres.in/api/posts'

  // on recupere l'adresse de l'api
  url = 'https://reqres.in/api/users'

  // on implemente le constructeur dans laquelle il y a un parametre, on defini sa porté
  // porte attribut: type

  // constructor(private http: HttpClient) { }
  // test avec heritage
  // getUserList() {
  //   this._userService
  // }



  // ! tjrs un return sauf pour : void
  // methode qui retourne un observable
  //     // on recupere les donnees un observable
  //     getUsers(): Observable<User[]> {

  //         // à la methode get je met l'url
  //     //     return this._http.get(this.url)
  //     //         .pipe(this.responses=responses.map(
  //     //                 (response) => {
  //     //                     name:response.data.first_name
  //     //                                 }))
  //     // }

  // }
  getUsers(): Observable<User[]> {
    return this._http.get<ResponseApiUser>(this.url).pipe
      (map((response: ResponseApiUser) => {
        return response.data
      }))
  };

  // postData(ce qu'on veut envoyer)
  postData(formUser: any): Observable<any> {
    // urlApi,objet qui envoi un objet, j'envoi au backend
    return this._http.post(this.url, { data: formUser })
    //
  }

  // l'utilisateur choisi
  setUserCurrent(user: User) {
    // envoyer ces informations à travers l'observable à tous l
    this.currentUser.next(user)
    // on envoie a tous les abonnes
    // this.idCurrent = user.id
  }

  getUserCurrent(): Observable<User> {
    return this.currentUser.asObservable()
    // return this._http.get(this.url + '/' + this.idCurrent)
  }


}
