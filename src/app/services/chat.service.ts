import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

import { BackendService } from './backend.service';
import { GlobalHttpService } from './global-http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _socket: Socket, private _http: HttpClient, private _snackBar: MatSnackBar) { }


  // url API
  url = 'https://official-joke-api.appspot.com/jokes/programming/ten'

  // * url pour avoir la liste des friends
  urlFriends = `${environment.API_URL}api/users/friends`

  // * url pour ajouter un ami
  urlAddFriend = `${environment.API_URL}api/users/addfriend`

  urlAllMessage = `${environment.API_URL}api/messages/friendmessages`

  urlAllMsgFriend = `${environment.API_URL}api/messages/friendmessages/`


  //  je cree un observable
  nextMyMessage = new Subject<any>()

  nextAllMessages = new Subject<any>()

  usersOnLine=new Subject<any>()




  // *initier les conversations, on initie la conversation
  initConversation() {
    this._socket.emit('login', { token: BackendService.getToken() });
  }
  // initConversation(msg: string) {
  //   this._socket.emit('login', { token: BackendService.getToken() });
  // }


  // *envoie un message, on va transferer l'objet , je vais emit dans le salon "send friend message"
  // * friendName, content le message en question
  sendMessage(user: any, message: string) {
    this._socket.emit('send friend message', { friendName: user.username, content: message })
  }

  // *on recupere le message envoyé >>>>>>>>>>>>>>>>>>> a afficher dans le chatroom
  // * affiche les messages , deuxieme parametre un callback
  //* on recoit le message que l'on a ecrit nous meme
  // getmessagesSent
  getMessagesSent(): any {
    this._socket.on('friend message sent', (messages: any) => {
      console.log("message que j'ecris",messages)
      this.nextMyMessage.next(messages)
    })
  }
  // !test observable
  getMsgSentObs(): Observable<any> {
    return this.nextMyMessage.asObservable()
  }


  //  ! je vais nexter les messages
  // * je vais ecouter constament >>>>>> les messages que l'on m'ecrit
  getMessageOnline() {
    this._socket.on('friend message', (messages: any) => {
      console.log("message qu'on m'ecris",messages)
      // *pour diffuser les infos
      this.nextAllMessages.next(messages)
    })
  }

  // ! je test subject
  getMsgOnlineObs(): Observable<User> {
    return this.nextAllMessages.asObservable()
  }



  //* retourne tous les message de la personne
  getFriendMessages(): Observable<any> {
    return this._http.get(this.urlAllMessage)
  }


  //* retourne tous les message de la personne avec qui je discute
  getMsgFriend(username: any): Observable<any> {
    return this._http.get(this.urlAllMsgFriend + username)
  }

  // getMessages(): Observable<any> {
  //   // return this._http.get(this.url)
  //   return this._http.get(this.url)
  // }


  // * ajouter un ami avec la  methode post
  addFriend(user: User) {
    this._snackBar.open("Amis ajouté !", 'ok', { verticalPosition: 'top' })

    // retourne true ou false
    return this._http.post(this.urlAddFriend, { "friendName": user.username })

  }


  // *afficher la liste des amis
  getFriends() {
    return this._http.get(this.urlFriends)
  }

  // méthode qui écoute tout le temps la liste des
  //  utilsateurs en ligne et on la next

  friendsOnLine() {
    this._socket.on ('users list', (users: any)=> {
      console.log('liste des utilsateurs connectés ', users)
      this.usersOnLine.next(users)
    })
  }

/* méthode qui permet d'afficher si les users sont en ligne
   * ".on" (ecoute tout le temps)
   * @returns Observable
   */
  getFriendsOnline(): Observable<any> {
    return this.usersOnLine.asObservable()
  }


}
