import { Directory } from 'src/app/models/directory-model';


import { DirectoryModalComponent } from './../../modals/directory-modal/directory-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DirectoryService } from 'src/app/services/directory.service';



@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  // attribut
  directories: Directory[] = [];

  //  directories!:any[]

  directoryForm!: FormGroup


  constructor(private _matDialog: MatDialog,
    private _directoryService: DirectoryService) { }

  ngOnInit(): void {
    console.log(this.directories)
  }


  openDialog(): void {

    const dialogRef = this._matDialog.open(DirectoryModalComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms'
    })

    // apres que la modale soit  la fermeture je recupere les resultat, on anticipe la fermeture
    dialogRef.afterClosed().subscribe((responseFromModal: any) => {
      console.log(responseFromModal)
      let data = responseFromModal.data
      this.directories.push(new Directory(data.nom, data.path, data.description))
      console.log(data)

    })
  }


}














