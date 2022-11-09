import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgePipe } from 'src/app/pipes/age.pipe';
import { ChatUserModalComponent } from 'src/app/modals/chat-user-modal/chat-user-modal.component';
import { CommonModule } from '@angular/common';
import { DirectoryModalComponent } from './../../modals/directory-modal/directory-modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';

@NgModule({
  declarations: [
    WeatherModalComponent,
     ChatUserModalComponent,
      UserModalComponent,
      DirectoryModalComponent,AgePipe
  ],
  imports: [
    MatAutocompleteModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    PickerModule,


    MatSlideToggleModule,
    // MatListModule,
    MatDatepickerModule,
    // MatSidenavModule,
    // MatToolbarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    // MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [
    DirectoryModalComponent,
    MatListModule,
    MatAutocompleteModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatBadgeModule,
    PickerModule,
    WeatherModalComponent,
    MatSlideToggleModule,
    // MatListModule,
    MatDatepickerModule,
    // MatSidenavModule,
    // MatToolbarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    // MatFormFieldModule,
    MatDialogModule,
    WeatherModalComponent,
    ChatUserModalComponent,
     UserModalComponent,
     DirectoryModalComponent,
     AgePipe




  ]
})
export class SharedModule {

}

