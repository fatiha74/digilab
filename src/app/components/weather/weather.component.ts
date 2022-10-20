import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';
import { WeatherService } from './../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  // valeur par defaut


  // url de base
  url = "https://api-adresse.data.gouv.fr/search/?q="


  constructor(private _weatherService: WeatherService, private _http: HttpClient, private _matDialog: MatDialog) { }

  ngOnInit(): void {


  }



  /**
   * on cree un objet
   */
  meteo = {
    rue: '11 rue Paul Bert',
    cp: 74100,
    ville: 'Annemasse',
    temperature: 0

  }

  openDialog(): void {

    // j'initialise une constante pour faire appel a la methode afterclose
    // je pour ouvrir matdialog et afterClosed
    const dialogRef = this._matDialog.open(WeatherModalComponent, { data: this.meteo })
    // je recois ma reponse, apres la fermeture tu reagis
    dialogRef.afterClosed().subscribe((resultFromWeatherModal: any) => {
      console.log(resultFromWeatherModal)
       this.meteo.temperature=resultFromWeatherModal.temperature
       this.meteo.rue=resultFromWeatherModal.formulaire.rue,
       this.meteo.cp=resultFromWeatherModal.formulaire.cp,
       this.meteo.ville=resultFromWeatherModal.formulaire.ville

    })


  }






  // apres que la modale soit  la fermeture je recupere les resultat, on anticipe la fermeture
  // dialogRef.afterClosed().subscribe((responseFromModal: any) => {
  //   console.log(responseFromModal)
  //   let data = responseFromModal.data
  //   this.directories.push(new Directory(data.nom, data.path, data.description))
  //   console.log(data)

  // })
}


  // const dialogRef = this._matDialog.open(WeatherComponent, {
  //   enterAnimationDuration: '1000ms',
  //   exitAnimationDuration: '1000ms'
  // })


  // getLatLong(ville = 'annecy') {
  //   console.log(this._http.get(this.url + '' + ville))
  //   return this._http.get(this.url + '' + ville)
  // }

