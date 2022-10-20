import { DirectoryService } from 'src/app/services/directory.service';
import { MatFormField } from '@angular/material/form-field';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Directory } from 'src/app/models/directory-model';
import { observable } from 'rxjs';

@Component({
  selector: 'app-directory-modal',
  templateUrl: './directory-modal.component.html',
  styleUrls: ['./directory-modal.component.scss']
})
export class DirectoryModalComponent implements OnInit {

  directoryForm!: FormGroup
  result!: any

  constructor(
    private _fb: FormBuilder, private _directoryService: DirectoryService, public dialogRef: MatDialogRef<DirectoryModalComponent>) {
  }

  ngOnInit(): void {
    // initialiser
    this.directoryForm = this._fb.group({
      // id:[this.getRandomInit()],
      nom: ['', Validators.required],
      path: ['', Validators.pattern('[a-zA-Z0-9&?-_.]{2,}@+')],
      // path: ['', Validators.required],
      description: ['', Validators.minLength(10)]
    })

  }


  onSubmit() {

    // let { nom, path, description } = this.directoryForm.value
    let { nom, path, description } = this.directoryForm.getRawValue()
    let dir = new Directory(nom, path, description)
    this._directoryService.postData(dir).subscribe(response => {
      console.log(response)
      this.dialogRef.close(response)
    })

  }
  onCloseModal() {
    this.dialogRef.close()
  }


}
