import { GlobalHttpService } from './global-http.service';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends GlobalHttpService {

  // on recupere l'url de restcountries
  // on initialise l'attribut
  urlCountry = "https://restcountries.com/v3.1/all"

  // surcharger
  //  _http!: HttpClient
  //  _userService!:UserService

  // @ts-ignore
  // constructor(@inject(data)) {
  //   super(data, data)
  //   console.warn(data)
  // }

  // il faut la class HttpClient
  // getCountries()
  getCountries(): Observable<any> {
    // on retourne un observable
    return this._http.get(this.urlCountry)
  }


  // getUserList() {
  //   this._userService
  // }
}
