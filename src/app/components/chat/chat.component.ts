import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private _activetedRoute: ActivatedRoute) { }

  profile!: User
  ngOnInit(): void {

    // * resolver
    this._activetedRoute.data.subscribe((dataReceiveFromResolver: any) => {
      this.profile = dataReceiveFromResolver.profile
    })
  }

}
