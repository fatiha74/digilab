import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


import { DataService } from 'src/app/services/data.service';
import { Observable, map, startWith } from 'rxjs'

import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //skills!: FormArray

  // const form = this.userForm.value;
  // un attribut recoit toute les info du formulaire
  userForm!: FormGroup;


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

  // on importe
  constructor(private _matDialog: MatDialog, private _dataService: DataService, private _formBuilder: FormBuilder, private _userService: UserService, private http: HttpClient) { }



  ngOnInit(): void {

    // je construis mon formulaire, attribut group(un objet)
    this.userForm = this._formBuilder.group({
      // on initialise, les clés doient respecter les formControlName
      nom: '',
      prenom: '',
      pseudo: '',
      dateB: '',
      mail: ['', [Validators.email, Validators.required]],
      rue: '',
      cP: 0,
      ville: '',
      pays: '',
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.minLength(8), Validators.required]],
      // qualite: ''
      // on ajoute un, on instance , initialise avec un tableau vide
      skills: new FormArray([]),
      // createdAt: String
    })





    // *********** correction
    this._dataService.getCountries().subscribe((countries: any) => {
      this.countries = countries;
      this.option = this.sortCountries()
      // console.log(this.option)
    })


    // ds le userForm tu va filtrer les pays
    // @ts-ignore
    this.filteredOptions = this.userForm?.get('pays')?.valueChanges.pipe(
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

    // toute les clés avec les valeur du formulaire
    console.log(this.userForm.value)

    // on recupere les donnees avec userform.value, on renvoie a l'api

    this._userService.postData(this.userForm.value).subscribe((response: any) => {
      console.log(response)
      this._matDialog.open(UserModalComponent,
        {
          data: { date: response.createdAt, infos: response.data }
        })

    })
  }

  // getCountry() {
  //   // this.profileService.getData().subscribe(response =>
  //   //   this.options = response)
  //   this.dataService.getData().subscribe((value: any) => (this.pays = value.name));


  // }

}
