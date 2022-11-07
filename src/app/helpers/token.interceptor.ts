import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { BackendService } from '../services/backend.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from './../services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _backendService: BackendService, private _snackBar: MatSnackBar) { }

  //* methode recoit la requete et le gestionnaire de requette
  //* il se positionne a la sortie, il ecoute a chaque fois il voit quelque chose sortir il intercepte et on peut le modifier
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    // si j'ai un token je dois inserer le token dans le header
    // *on recupere le token
    // methode static
    const token = BackendService.getToken()

    let clone = request

    console.log(request.url)

    // * si on atteind le backend, propriete de httpRequest
    if (request.url.includes(environment.API_URL+"api")) {

      //* on cloner un autre headers et on ajoute 'Authorisation'
      // * car on ne peut pas modifier on ne peut pas .append
      clone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })

      console.log(clone)
      // le gestionnaire de requete renvoi la requete qu'il a vu au debut
      // //
      //   return next.handle(request);
    }
    return next.handle(clone).pipe(
      // * catchError operateur rxjs,
      // ! attrape les erreurs
      catchError((error: HttpErrorResponse) => {
        let message = ""
        switch (error.status) {
          case 400: message = "Badrequest, erreur Identifiant ou Mot de passe "
            break;
          case 401: message = "Unauthorized"
            break;
        }

        this._snackBar.open(message, 'ok', { verticalPosition: 'top' })
        // * renvoi la requete soit clone=request soit clone=requete.clone....
        return next.handle(clone)

      })



    )
  }
}

  // on va exporter un token intercpteur provider
  // on construit notre provider
  export const TokenInterceptorProvider = {
    // il se met au bon endroit
    provide: HTTP_INTERCEPTORS,
    // on utilise la class tokenInterceptor qui a ete genere toute seule ici
    useClass: TokenInterceptor,
    // on met a disposition partout
    multi: true
  }
