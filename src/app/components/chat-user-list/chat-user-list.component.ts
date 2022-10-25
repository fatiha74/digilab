import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ChatUserModalComponent } from './../../modals/chat-user-modal/chat-user-modal.component';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {

  // bar de recherche
  searchBar: FormControl = new FormControl();

  // je cree un tableau qui va recuperer les donnees
  users: User[] = []

  //tableau
  userInfos!: any[]

  userArray!: any[]

  // on inject le service
  constructor(private _userService: UserService, private _matDialog: MatDialog) { }

  ngOnInit(): void {

    // service.methodedansservice.souscription(resultat de l'observable)
    // recupere la liste des utilisateurs
    this._userService.getUsers().subscribe((result: User[]) => {
      this.users = result
      // fait une copie du tableau equivaut this.userArray=result
      this.userArray = [... this.users]

      console.log(this.users)
    })



    // barre de recherche
    this.searchBar.valueChanges.subscribe((value: any) => {
      // si j'ecris une valeur dans la barre de recherche
      if (value) {
        this.users = this.users.filter((user: any) => {
          if (user) {
            // tableau filtré
            return (user.first_name).toLowerCase().includes(value.toLowerCase())
          }

        })
      } else {
        // je recupere le tableau d'origine
        this.users = this.userArray
      }

    })

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
