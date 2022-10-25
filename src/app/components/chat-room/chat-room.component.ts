import { Component, OnInit } from '@angular/core';

import { ChatService } from './../../services/chat.service';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { MatChipList } from '@angular/material/chips';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit {


    // l'utilisateur qui a ete selectionner , pour @Input
    infoUser!: any

    //  formControl de l'input
    newMessage: FormControl = new FormControl()


    results: any[] = []
    constructor(private _userService: UserService, private _chatService: ChatService) { }

    ngOnInit(): void {

        // la methode getUserCurrent reagi uniquement au préalable si la méthode SetUserCurrent est appelé
        this._userService.getUserCurrent().subscribe((response: any) => {
            console.warn(response.value)
            this.infoUser = response

            this._chatService.getMessages().subscribe((value: any) => {
              this.results = value
              console.log(value)
          })

            // console.warn("info user" + this.infoUser.data)
        })


    }

    onClick() {

        // on push dans le tableau
        this.results.push({ setup: this.newMessage.value })
        this.newMessage.reset()
        // reponse au bout de 2 seconde
        
        setTimeout(() => {
            let i = Math.floor(Math.random() * this.results.length);

            this.results.push({ punchline: this.results[i].punchline })
        }, 2000);


    }

    // quand on appuie sur le bouton entre
    onSendMessage(event: KeyboardEvent) {

        console.warn(event)
        if (event.code === "Enter") {
            this.onClick()

            setTimeout(() => {
                let i = Math.floor(Math.random() * this.results.length);

                this.results.push({ punchline: this.results[i].punchline })
            }, 2000);
        }

    }


}

