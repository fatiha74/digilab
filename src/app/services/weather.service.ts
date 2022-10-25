import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { GlobalHttpService } from './global-http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends GlobalHttpService{

  localisation: any[] = []


  urlGps = "https://api-adresse.data.gouv.fr/search/"
  urlMeteo = "https://api.open-meteo.com/v1/forecast/"



  // BaseUrl = "https://geocoding-api.open-meteo.com/v1/search?name="

  // on injecte httpclient
  // constructor(private _http: HttpClient) { }

  /**
   *il nous impose une methode get
   * @param rue
   * @param cp
   * @param ville
   * @returns
   */

  getCoordinates(rue: string, cp: number, ville: string): Observable<any> {

    let paramsData = new HttpParams().append("q", `${rue},${cp},${ville}`)

    return this._http.get(this.urlGps, { params: paramsData })

  }


  getMeteo(longitude: Number, latitude: Number): Observable<any> {

    let paramsWeather = new HttpParams()
      .append('hourly', 'temperature_2m')
      .append('latitude', `${latitude}`)
      .append('longitude', `${longitude}`)
      .append('timezone', 'Europe/Berlin')
    return this._http.get(this.urlMeteo, { params: paramsWeather })

  }

}


