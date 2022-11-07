import { Component, OnInit } from '@angular/core';

import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
myProfil!:any
  constructor( private _backend: BackendService, private _userService : UserService) { }

  ngOnInit(): void {

     // *on recupere le profile
     this._userService.getProfile().subscribe((response: User) => {

      this.myProfil = response
      console.warn(response)
    })
  }

}
