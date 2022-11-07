import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs'

import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //skills!: FormArray
  avatar!: string
  // const form = this.userForm.value;
  // un attribut recoit toute les info du formulaire
  userForm!: FormGroup;
  errorPass = true
  options = ["sam", "toto"]
  countries!: any[]
  countriesFiltre!: any[]
  // formControl
  myControl = new FormControl()
  // on declare l'attribut option
  // retourne un tableau
  option!: string[];
  filteredOptions: Observable<string[]> | undefined;
  date!: any
  // on instancie un nouvel utilisateur
  user = new User()

  // on importe
  constructor(private route: Router, private _matDialog: MatDialog,
    private _dataService: DataService, private _fb: FormBuilder,
    private _backend: BackendService, private _snackBar: MatSnackBar, private _userService: UserService) { }

  ngOnInit(): void {

    // initialiser avatar
    this.avatar = "https://picsum.photos/200"
    // je construis mon formulaire, attribut group(un objet)
    this.userForm = this._fb.group({
      username: [this.user.username, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      avatar: [this.avatar],
      password: [this.user.password, [Validators.minLength(8),
      Validators.maxLength(12)]],
      confirmPassword: ["", Validators.required],
      dateOfBirth: this.user.dateOfBirth,
      email: [this.user.email, [
        Validators.email,
        Validators.required]],
      country: this.user.country,
      city: this.user.city,
      street: [this.user.street, Validators.required],
      zipCode: this.user.zipCode,
      phoneNumber: this.user.phoneNumber,
      skills: new FormArray([])
    })


    //**************  test heritage, la methode est dans la class mere GlobalHttpService
    this._dataService.getProfileList()

    // *********** correction
    this._dataService.getCountries().subscribe((countries: any) => {
      this.countries = countries;
      this.option = this.sortCountries()
      // console.log(this.option)
    })


    // ds le userForm tu va filtrer les pays
    // @ts-ignore
    this.filteredOptions = this.userForm?.get('country')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  // // remove une competence
  removeSkill(skillIndex: number) {
    this.skills.removeAt(skillIndex)
  }

  //add une competence
  addSkills() {

    // const competence = new FormControl('')
    // on le push dans le tableau skills
    this.skills.push(new FormControl(''));
  }

  //un getter pour recuperer tous les skills, je retourne les info de la propiete  skills
  // nous retourne les info de skills
  get skills(): FormArray {
    // alias as FormArray
    return this.userForm.get('skills') as FormArray;
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.option?.filter(option => option.toLowerCase().includes(filterValue));
  }


  sortCountries(): string[] {
    // je retourne tableau trier , dans chaque element du tableau qu'on recoit de l'Api je recupere le name et le met dans le nouveau tableau, dans name on a un autre objet common:'nompays'
    return this.countries.map((countrieName: any) => countrieName.name.common)
  }

  filterData(laData: string) {
    this.countriesFiltre = this.options.filter(item => {
      return item.toLocaleLowerCase().indexOf(laData.toLowerCase()) > -1
    })
  }


  onSubmit(): void {

    const profil = this.userForm.value
    const password = profil.password
    const confirmPass = profil.confirmPassword

    if (password !== confirmPass) {
      this.errorPass = true;
      this._snackBar.open('mot de passe different', 'ok', {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 2000,
        panelClass: ['red-snackbar']

      })
      return;
    }

    // toute les clés avec les valeur du formulaire
    // console.log(this.profilForm.value)

    // on recupere les donnees avec userform.value, on renvoie a l'api
    const form = this.userForm.value

    // 1ERE version sur 10 ligne
    // this.user.firstName=form.nom
    // 2eme version
    // on va fusionner les deux objets
    //   je vais affecter a this user la fusion, form vient fusionner au user
    this.user = Object.assign(this.user, form)

    // pour les skills
    this.user.skills = this.userForm.value.skills


    // this._userService.postData(form).subscribe((response: any) => {
    //     console.log(response)
    //     this._matDialog.open(UserModalComponent,
    //         {
    //             data: { date: response.createdAt, infos: response.data}
    //         })


    //     console.log(form)

    // })

    this._userService.register(this.user).subscribe((response: any) => {

      let { headers, status, body } = response
      console.log(response)

      localStorage.setItem('token', response.token)

    this.route.navigate(['/overview'])
    console.log(this.userForm.value)
    
    })

    // this._backend.postUser(this.user).subscribe((response: any) => {

    //   console.log('envoyer a la bd ' + response)
    //   console.log('token' + response.token)

    //   localStorage.setItem('token', response.token)

    //   // this._matDialog.open(UserModalComponent,
    //   //   {
    //   //     data: { date: response.createdAt, infos: response.data }
    //   //   })

    // })


  }

  // getCountry() {
  //   // this.profileService.getData().subscribe(response =>
  //   //   this.options = response)
  //   this.dataService.getData().subscribe((value: any) => (this.pays = value.name));


  // }

}
