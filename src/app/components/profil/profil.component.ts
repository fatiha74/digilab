import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  myProfil!: any

  username!: string
  constructor(private _backend: BackendService,
    private _userService: UserService,
    private _route: ActivatedRoute) {


  }

  ngOnInit(): void {

    // *on recupere le profile
    this._userService.getProfile().subscribe((response: User) => {

      this.myProfil = response
      console.warn(response)



    })

    // snapshot comme un photo qu'on crée, valeur ponctuelle
    console.log(this._route.snapshot.paramMap.get('username'))

    this._route.queryParams.subscribe(params => {
      this.username = params['name'];
    });

  }





}
