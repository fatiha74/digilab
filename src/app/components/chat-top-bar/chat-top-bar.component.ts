import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core'
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-top-bar',
  templateUrl: './chat-top-bar.component.html',
  styleUrls: ['./chat-top-bar.component.scss']
})
export class ChatTopBarComponent implements OnInit {


  @Input() donnees!: any;
  data!: any

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    // this._userService.getUserCurrent().subscribe((response: any) => {
    //   console.warn(response)
    //   this.data = response

    // })

    // console.warn("test"+this.test)

  }

}


