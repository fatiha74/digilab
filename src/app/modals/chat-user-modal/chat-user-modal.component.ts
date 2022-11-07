import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-user-modal',
  templateUrl: './chat-user-modal.component.html',
  styleUrls: ['./chat-user-modal.component.scss']
})
export class ChatUserModalComponent implements OnInit {

  // @Inject(MAT_DIALOG_DATA) public infos:any, pour recuperer info
  // matDialogref pour envoyer donnees au parent


  constructor(@Inject(MAT_DIALOG_DATA) public infos: any, private _matDialogRef: MatDialogRef<ChatUserModalComponent>) { }

  ngOnInit(): void {
    // console.log(this.infos)


  }

  // bouton ok
  onValidate(): void {
    //  fermer et envoyer info au parent , j'envoie data au component parent
    // l'utilisateur choisi en parametre
    this._matDialogRef.close(this.infos)
  }

  // bouton annuler
  onCancel(): void {
    this._matDialogRef.close()
  }

}
