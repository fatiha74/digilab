import { Component, OnInit } from '@angular/core';
import { MatSnackBar, _MatSnackBarBase } from '@angular/material/snack-bar';

import { ChatService } from './../../services/chat.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit {




  // l'utilisateur qui a ete selectionner , pour @Input
  infoUser!: any

  userChat!: any

  //  formControl de l'input
  newMessage: FormControl = new FormControl()

  myMessages: any[] = []

  // * fusion de tous les messages avec informations en plus
  allMsgArray: any[] = []

  // **********************************************************************
  // *messages reçu de la base de données +++blague
  results: any[] = []
  // *messages recu
  msgReceived: any[] = []

  // ********************************************************************

  // * socket io message que je recois
  allMsgOnline: any[] = []

  // *mes messages en live socket io
  myMsgOnline: any[] = []
  constructor(private _userService: UserService,
    private _chatService: ChatService,
    private _snackBar: MatSnackBar) { }


  messageDirect = {
    content: '',
    date: '',
    friendID: { username: '' },
    userID: { username: '' },
    __v: '',
    _id: ''
  }




  ngOnInit(): void {


    //* on initie la conversation
    this._chatService.initConversation()

    // ! les message que j'envoie
    this._chatService.getMessagesSent()

    // *je souscrie a l'observable, les messages que j'ai envoyé
    this._chatService.getMsgSentObs().subscribe((val: any) => {
      console.warn('mesage envoye', val);

      this.results.push(val)
    })

    // ! les messages que je reçoit
    // * en ecoute des message que je recoit
    this._chatService.getMessageOnline()

    //* je souscris à l'observable, les messages que je reçois
    this._chatService.getMsgOnlineObs().subscribe((val: any) => {
      console.log(val)
      if (val.userID.username != this.infoUser.username) {
        let phrase = val.userID.content
        this.playAudioSent()
        this._snackBar.open(`${val.userID.username}, ${val.content} `, 'ok', { verticalPosition: 'top' })
        // il faut incrémenter cette utilisateur de +1 message
        // let nbMsg= val.
      } else {
        this.results.push(val)
        // si le curentUser et le usermessage correspond j'affiche pas le badge
        this.infoUser.nbMsgEnAttente= null
      }
      // if(this.userChat.id===val.userID){

      // }

    })

    // la methode getUserCurrent reagi uniquement au préalable si la méthode SetUserCurrent est appelé
    this._userService.getUserCurrent().subscribe((response: any) => {
      // console.warn(response)
      this.infoUser = response

      // * on remet à zero le nbMsgEnAttente
      if (this.infoUser.nbMsgEnAttente) {
        this.infoUser.nbMsgEnAttente = null
      }
      this.userChat = response.username
      this._chatService.getMsgFriend(this.infoUser.username).subscribe((val: any) => {

        // this._chatService.getFriendMessages().subscribe((val: any) => {
        //   console.log("dans getFriend",val)
        this.results = val

        // console.log(this.results)
        // console.log(this.msgReceived)
        // this.allMgsArray.push(val,date)
        // console.warn("result : "+this.results[0].content)
      })
      // console.warn("info user" + this.infoUser.data)
    })
  }

  onClick() {

    // on push dans le tableau
    // this.results.push(this.newMessage.value)
    // * je recupere le message qui a ete saisie
    const msg = this.newMessage.value

    // * c'est ce que j'envoie , je vais emit
    this._chatService.sendMessage(this.infoUser, msg)

    this.newMessage.reset()

    // setTimeout(() => {
    //   let i = Math.floor(Math.random() * this.results.length);

    //   this.results.push({ punchline: this.results[i].punchline })
    // }, 2000);

  }

  // quand on appuie sur le bouton entre
  onSendMessage(event: KeyboardEvent) {

    console.warn(event)
    if (event.code === "Enter") {
      this.onClick()

      // setTimeout(() => {
      //   let i = Math.floor(Math.random() * this.results.length);

      //   this.results.push({ punchline: this.results[i].punchline })
      // }, 2000);
    }

  }

  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }

  playAudioSent() {
    let audio = new Audio();
    audio.src = "assets/sons/addUserSound.wav";
    audio.load();
    audio.play();
  }

}

