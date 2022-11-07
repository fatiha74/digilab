import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Directory } from '../models/directory-model';
import { GlobalHttpService } from './global-http.service';
import { Injectable } from '@angular/core';
import { ResponseApiUser } from './../models/response-api-user';
import { User } from './../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalHttpService {

  userProfile = {}


  reponses!: []
  // observable qui permet de souscrire
  currentUser = new Subject<User>()

  // initialiser le subject attendre le prochain flux de données , obliger de next
  userSubject = new BehaviorSubject<any>({})

  // initialiser, aura deja une données , une données par defaut
  // userSub = new BehaviorSubject([{}])


  // on initialise l'api
  // urlPost = 'https://reqres.in/api/posts'

  // on recupere l'adresse de l'api
  // private _apiUrl = `${environment.API_URL}api/users`

   private _apiUrl = `${environment.API_URL}api/users`
  // urlDB = 'http://localhost:3000/api/users'


  /***
   *  envoie donnees register à la base de donnee
  //  * */
  // postUser(form: User): Observable<any> {
  //   return this._http.post(this.urlDB,  form )
  // }

  // recuperer le token , pour pouvoir se loguer
  getToken() {
    // return this._http.get<User[]>(this.urlDB, Headers: token)
    //* getItem affiche le contenue de la cle token
    const newToken = localStorage.getItem('token')
    //  const myHeaders = new HttpHeaders({'myheader': newToken})

    if (newToken) {

      // on transforme en objet car localstorage veut du json
      const userObj = JSON.parse(newToken)
      const newObject = {
        email: userObj.email,
        pass: userObj.pass,
      }
      // on next
      this.userSubject.next(newObject)
      //  ça devient comme un observable on envoie un observable
      return this.userSubject.asObservable()
    }
    else {
      // on retourne un observable vide
      return of();
    }
  }



  // * on affiche la liste des utilisateurs
  // getUsers(): Observable<User[]> {
  //   return this._http.get<ResponseApiUser>(this._apiUrl).pipe
  //     (map((response: ResponseApiUser) => {

  //       console.log('user : ' + response.data)
  //     //   return response.data
  //     // }))
  // };

  // ********** BACKEND *****************************************************************************************
// ***************************************************************************************************************
  // * vers le backend liste users


  register(registerValues:User):Observable<any>{
    return this._http.post(`${this._apiUrl}/register`, registerValues, {observe: 'response'});
  }

  login(loginValues:any):Observable<any>{
    return this._http.post(`${this._apiUrl}/login`, loginValues, {observe: 'response'});
  }

  getProfile():Observable<any>{
    return this._http.get(`${this._apiUrl}/profile`,{observe: 'response'})
  }

  getUsersList():Observable<any>{
    return this._http.get(`${this._apiUrl}/list`, {observe: 'response'})
  }
  // *************************************************************************************************************

  // // postData(ce qu'on veut envoyer)
  // postData(formUser: any): Observable<any> {
  //   // urlApi,objet qui envoi un objet, j'envoi au backend
  //   return this._http.post(this._apiUrl, { data: formUser })
  //   //
  // }

  // // * en parametre l'utilisateur choisi
   setUserCurrent(user: User) {
  //   // envoyer ces informations à travers l'observable à tous l
    this.currentUser.next(user)
   }

   getUserCurrent(): Observable<User> {
     return this.currentUser.asObservable()
  //   // return this._http.get(this.url + '/' + this.idCurrent)
  }


  // //!version sans le backend
  // getProfile(): Observable<any> {

  //   // on recupere l'objet qu'on a convertit en chaine de caractere
  //   // const newData = localStorage.getItem('user')?.toString()
  //   const newData = localStorage.getItem('user')

  //   console.log("stor" + newData)

  //   if (newData) {

  //     // on transforme en objet
  //     const userObj = JSON.parse(newData)

  //     // on split
  //     const nom = userObj.email.split(/[.@]/)[0]
  //     const prenom = userObj.email.split(/[.@]/)[1]

  //     const myObject = {
  //       nom: nom,
  //       prenom: prenom,
  //       avatar: userObj.avatar,
  //       email: userObj.email
  //     }

  //     // on next
  //     this.userSubject.next(myObject)
  //     //  ça devient comme un observable on envoie un observable
  //     return this.userSubject.asObservable()
  //   }
  //   else {
  //     return of();
  //   }
  // }
}
