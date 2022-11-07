import { Component, OnInit } from '@angular/core';

import { BackendService } from './../../services/backend.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

opened=true

  constructor(private _backend:BackendService) { }

  ngOnInit(): void {
   // recuperer le profil de l'utilisateur courant

  }

  onDisconect(){

this._backend.clearToken()


  }

}
