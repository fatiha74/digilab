import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BackendService } from 'src/app/services/backend.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //on instancie la class User
  user = new User()
  // stock token
  tkn!: any
  // user!: any
  loginForm!: FormGroup

  // on cree un objet

  /**
   * on cree un objet
   */
  userLog = {
    email: '',
    password: '',
    avatar: '',
  }

  constructor(private route: Router, private _backend: BackendService, private _fb: FormBuilder, private _userService: UserService) { }

  ngOnInit(): void {

    this.loginForm = this._fb.group({
      // id:[this.getRandomInit()],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required]
    })
  }


  onSubmit() {

    // *on recupere les données du formulaire
    const form = this.loginForm.value

    // ? 1ERE version sur plusieurs lignes
    // ? this.user.firstName=form.nom
    // 2eme version
    // on va fusionner les deux objets
    // * 2eme version,   je vais affecter a this.user la fusion, form vient fusionner au user
    this.user = Object.assign(this.user, form)


    this._userService.login(this.user).subscribe((response: any) => {
      this.tkn = response.body.token

      console.log(response);

      localStorage.setItem('token', this.tkn)
      this.route.navigate(['overview'])
    })


    // *on envoie le formulaire login sur la route login
    // this._backend.postLoginUser(this.user).subscribe((response: any) => {
    //   console.log('token' + response.token)
    //   this.tkn = response.token

    //   // *on cree un objet pour conserver l'email et le token
    //   let dataLogin = {
    //     email: this.user.email,
    //     token: this.tkn
    //   }
    //   //* on stock dans le localStorage
    //   localStorage.setItem('digichat-token', JSON.stringify(dataLogin))

    //   //* on redirige après avoir reçu le token
    //   // d'abord verifier si on est ok avec le token
    //   // j'utilise l'attribut route  et la  methode qui attend un tableau, on met la route à atteindre
    //   this.route.navigate(['/overview'])

    // })


    // //* setItem(key, value)
    // //!on enregistre dans localStorage
    // localStorage.setItem('token', this.tkn)

    // const mailValue = this.loginForm.value.email;
    // // choisir un avatar
    // this._userService.getUsers().subscribe((result: any) => {
    //   // recuperer info
    //   // fait une copie du tableau equivaut this.userArray=result
    //   const avatarUser = result[2].avatar
    //   // on recupere les infos du formulaires
    //   const user = { email: mailValue, avatar: avatarUser }
    //   // on va installer une nouvelle valeur
    //   //* user est un objet localstorage veut du json
    //   localStorage.setItem('user', JSON.stringify(user));

    // })



  }

}
