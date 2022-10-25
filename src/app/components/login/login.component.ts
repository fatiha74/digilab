import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    // j'utilise l'attribut route  et la  methode qui attend un tableau, on met la route à atteindre
    this.route.navigate(['/overview'])

  }
}
