import { WeatherService } from './../../services/weather.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, switchMap, take, delay } from 'rxjs/operators'

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss']
})
export class WeatherModalComponent implements OnInit {

  isWait = false;

  url = "https://api-adresse.data.gouv.fr/search/?q="

  weatherForm!: FormGroup

  dataGps = {
    longitude: Number,
    latitude: Number
  }
  /***
   * inject permet de recuperer info, du "parent"
   */
  constructor(private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public infos: any, private _http: HttpClient, private _matDialogRef: MatDialogRef<WeatherModalComponent>, private _weatherService: WeatherService) { }


  ngOnInit(): void {

    console.log(this.infos)
    /**
     * Affecter le formulaire
     */
    this.weatherForm = this._fb.group({
      // id:[this.getRandomInit()],
      rue: [this.infos.rue, Validators.required],
      cp: [this.infos.cp, Validators.required],
      // path: ['', Validators.required],
      ville: [this.infos.ville, Validators.required]
    })

  }

  onSubmit() {

    // on recupere les valeurs du formulaires
    const form = this.weatherForm.value
    // on recuper l'heure
    let now = new Date()
    let heure = now.getHours()
    this.isWait = true;
    // je transfere les donnees au service on recupere les coordonnées, ma methode dans mon service me retourne un observable
    this._weatherService.getCoordinates(form.rue, form.cp, form.ville)
      .pipe(take(1), delay(2500), switchMap((responseFromServerGps: any) => {
        // ! return obligatoire  dans le switchmap, la methode retourne elle meme une observable
        console.log(responseFromServerGps);

        const gps = {
          latitude: responseFromServerGps.features[0].geometry.coordinates[0],
          longitude: responseFromServerGps.features[0].geometry.coordinates[1]
        }
        return this._weatherService.getMeteo(gps.latitude, gps.longitude)
      }))
      // **on souscrit à la reponse du serveur Weather
      // ! transfert possible de data de données de la modal au component parent grace au dilogRef et la methode close()
      .subscribe(responseFromServerWeather => {

        // on close avec la deuxieme souscription
        this._matDialogRef.close({ temperature: responseFromServerWeather.hourly.temperature_2m[heure], formulaire: { rue: form.rue, cp: form.cp, ville: form.ville } })

      })
    // transfere possible de data , de la modale au component parent
    // qd on a recu la souscription de la 2eme observable

  }
  // On subscribe
}



