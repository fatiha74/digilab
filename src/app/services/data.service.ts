import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DataService {


  // on recupere l'url de restcountries
  // on initialise l'attribut
  urlCountry = "https://restcountries.com/v3.1/all"

  // on declare
  // (porte parametre: type )
  constructor(private http: HttpClient) { }

  // il faut la class HttpClient
  // getCountries()
  getCountries(): Observable<any> {
    // on retourne un observable
    return this.http.get(this.urlCountry)
  }
}
