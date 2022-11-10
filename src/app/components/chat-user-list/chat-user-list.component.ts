import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { BackendService } from './../../services/backend.service';
import { ChatService } from './../../services/chat.service';
import { ChatUserModalComponent } from './../../modals/chat-user-modal/chat-user-modal.component';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { __values } from 'tslib';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {

  // * toggle
  isChecked = true;

  // //* cumul msg
  //  nbMsgEnAttente!:number

  // * curent user
  currentUser!: any

  isFriend = false;

  showFiller = false;
  // bar de recherche
  searchBar: FormControl = new FormControl();


  usersOrigine: User[] = []
  //* tableau qui va recupere la liste des utilisateurs
  users: User[] = []
  //*duplicata du tableau recu de l'api
  usersArray!: User[]

  friendsOrigine: User[] = []
  // * tableau contenant la liste d'amis
  friends: User[] = []
  //*duplicata du tableau recu de l'api
  friendsArray!: any[]

  myProfil!: any
  //tableau
  // userInfos!: User[]

  profileUser!: any

  @Input() profile!: User

  // * les personnes en ligne
  statusOnline: any[] = []

  // on inject le service
  constructor(private _userService: UserService, private _matDialog: MatDialog,
    private _backend: BackendService, private _chatService: ChatService) { }

  ngOnInit(): void {


    // * liste des amis
    this._chatService.getFriends().subscribe((val: any) => {
      // tableau de base
      this.friendsOrigine = val
      //tableau qu'on va filtrer
      this.friends = val
    })

    // * filter tableau users et friends
    // this.friends = this.friends.filter(elem => elem.username !== this.users.includes(elem.username))


    //  * on recupere le profile dans le backend
    this._backend.getProfileUserCurrent().subscribe((response: User) => {
      this.myProfil = response
      console.warn(response)
    })

    // service.methodedansservice.souscription(resultat de l'observable)
    //*on recupere la liste des utilisateurs
    // this._userService.getUsers().subscribe((result: User[]) => {
    //   this.users = result
    //   //on duplique le tableau users
    //   this.userArray = [... this.users]
    // })

    // * avoir le profile
    this._userService.getProfile().subscribe((val: any) => {
      console.warn(val)
      this.myProfil = val.body
      console.warn(this.myProfil)
    })

    // * getuserlist du backend
    this._userService.getUsersList().subscribe((val: any) => {

      this.usersOrigine.map((user: User) => {
        user.avatar = user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        return user
      })
      this.friendsOrigine.map((user: User) => {
        user.avatar = user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        return user
      })
      console.warn(val)
      // tableau de base
      this.usersOrigine = val.body
      // tableau qu'on va filtrer
      this.users = val.body

      console.warn(this.users)
    })


    /*********************************************
     *
     *   if (value) {
              this.users = this.users.filter((user: any) => {
                if (user) {
                  // tableau filtré
                  return (user.firstName).toLowerCase().includes(value.toLowerCase())
                }
              })
            } else {
              // je recupere le tableau d'origine
              this.users = this.usersArray
            }
     * ********************************************/

    //*la barre de recherche pour la liste de user
    this.searchBar.valueChanges.subscribe((value: any) => {
      // si j'ecris une valeur dans la barre de recherche
      // !si ischecket
      if (value) {
        if (this.isChecked) {
          this.users = this.usersOrigine
          this.users = this.users.filter((user: any) => {
            if (user) {
              // tableau filtré
              console.log("utilisateur", value)
              return (user.firstName).toLowerCase().includes(value.toLowerCase()) ||
                (user.lastName).toLowerCase().includes(value.toLowerCase())
            }

          })




        } else {
          this.friends = this.friendsOrigine
          this.friends = this.friends.filter((user: any) => {
            if (user) {
              // tableau filtré
              console.log("friend", value)

              return (user.firstName).toLowerCase().includes(value.toLowerCase()) ||
                (user.lastName).toLowerCase().includes(value.toLowerCase())
            }
          })
        }
      } else {
        // je recupere le tableau d'origine
        this.friends = this.friendsOrigine
        this.users = this.usersOrigine
      }
    })

    // * liste des amis en ligne
    this._chatService.friendsOnLine();

    this._chatService.getFriendsOnline().subscribe((usersOnline: any) => {
      console.log('liste des users connectés :' + usersOnline);

      this.users.forEach((userTab: any) => {
        if ((usersOnline).includes(userTab.username)) {
          userTab.online = true
        }
      })

      this.friends.forEach((userTab: any) => {
        if ((usersOnline).includes(userTab.username)) {
          userTab.online = true
        }
      })
    })

    // * cumul des messages par personne
    this._chatService.getMsgOnlineObs().subscribe((messageRecu: any) => {
      console.log(('messageRecu: ' + messageRecu));
      this._userService.getUserCurrent().subscribe((response: any) => {
        // console.warn(response)
        this.currentUser = response
      })

      this.users.forEach((item: any) => {

        // if(item.username!= this.currentUser.username){

        if (item.username == messageRecu.userID.username) {
          if (item.nbMsgEnAttente) {
            item.nbMsgEnAttente = item.nbMsgEnAttente + 1
          } else {
            item.nbMsgEnAttente = 1
          }
          // }
        }
      })
    })

  }
  // // !version sans le backend
  // // on affiche la personne qui s'est loguer
  // // ! version sans le backend
  // this._userService.getProfile().subscribe((response: any) => {

  //   console.log(response)
  //   this.profileUser = response
  //   console.warn(response)

  // })





  // *Ajouter comme ami
  onAddFriend(item: User) {
    this._chatService.addFriend(item).subscribe((value: any) => {
      console.log(value)
      // * l'ajouter au tableau le nouvel amis l'objet item
      this.friends.push(item)
      // this.okFriend=true;
    })

  }

  onRemoveFriend(user: any) {
    // const index =this.friends.indexOf(i)
    // if(index > -1){
    //   this.friends.splice(index,1)
    // }
    console.log('je suis la');

    this.friends = this.friends.filter(elem => elem.username !== user.username)
  }



  // parametre c'est le user que j'ai cliqué
  // ou en parametre user
  // onOpenModal(i:number) {
  onOpenModal(user: User) {
    // on ouvre la modale , open(nomModat)
    const modalRef = this._matDialog.open(ChatUserModalComponent, {
      // toujours data
      // data:{index:user}
      data: { user: user }
      // data: { index: this.users[i] }
    })
    // après la fermeture de la modale je souscris
    modalRef.afterClosed().subscribe((responseFromModal: User) => {
      if (responseFromModal) {
        // une methode pour dire qu'on utilise cet utilisateur
        // j'envoi l'info à travers un service à tous les components qui vont souscrire à cette observable
        this._userService.setUserCurrent(user)

      }

    })

  }

}
