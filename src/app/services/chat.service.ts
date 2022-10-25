import { GlobalHttpService } from './global-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends GlobalHttpService {


  // url API
   url = 'https://official-joke-api.appspot.com/jokes/programming/ten'


  getMessages(): Observable<any> {

    return this._http.get(this.url)

  }

}
