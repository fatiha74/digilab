import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Directory } from '../models/directory-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  url = 'https://reqres.in/api/users'
  dirSubject = new Subject()

  // on implemente, pour importer le service
  constructor(private _http: HttpClient) { }


  postData(formDirectory: Directory): Observable<any> {
    // urlApi,objet qui envoi un objet, j'envoi au backend
    // lien service backend , envoi data post(urlApi, ce qu'on envoi un objet, le nom imposer par le backend)
    return this._http.post(this.url, { data: formDirectory })
    //
  }

  // methode qui retourne un observable
  getDirectory(id: number): Observable<any> {
    // à la methode get je met l'url
    return this._http.get(this.url)

  }

  addDirectory(dir: Directory): void {
    let data = {
      action: "create",
      dir: dir
    }
    this.dirSubject.next(data)
  }
}
