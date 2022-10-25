import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-top-bar',
  templateUrl: './chat-top-bar.component.html',
  styleUrls: ['./chat-top-bar.component.scss']
})
export class ChatTopBarComponent implements OnInit {

  data!: any

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this._userService.getUserCurrent().subscribe((response: any) => {
      console.warn(response)
      this.data = response

    })

  }

}


