import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpService {

  // protected accessible pour les classes qui héritent
  // pas les services que l'on a cree nous meme
  constructor(protected _http: HttpClient) { }


  // test methode utilisé dans register.ts dans le ngOnInit
  getProfileList(): string {

    return ''
  }
}
