import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../models/user';
import { Directory } from '../models/directory-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {



  // on initialise l'api
  // urlPost = 'https://reqres.in/api/posts'

  // on recupere l'adresse de l'api
  url = 'https://reqres.in/api/users'

  // on implemente le constructeur dans laquelle il y a un parametre, on defini sa porté
  // porte attribut: type
  constructor(private http: HttpClient) { }

  // methode qui retourne un observable
  getUser(): Observable<any> {

    // à la methode get je met l'url
    return this.http.get(this.url)

  }



  // on implemente une methode pour poster le formulaire
  // postData(): Observable<any> {
  //   return this.http.post(this.urlPost)
  // }

  // postData(ce qu'on veut envoyer)
  postData(formUser: any): Observable<any> {
    // urlApi,objet qui envoi un objet, j'envoi au backend
    return this.http.post(this.url, { data: formUser })
    //
  }


  // create(name: string): Promise<User> {
  //   return this.http
  //     .post(this.urlPost, JSON.stringify({ name: name }), { headers: this. })
  //     .toPromise()
  //     .then(res => res.json().data as User)
  //     .catch(this.handleError);
  // }


}
