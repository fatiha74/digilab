import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { NgModule, ɵisObservable } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AgePipe } from './pipes/age.pipe';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './components/chat/chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatTopBarComponent } from './components/chat-top-bar/chat-top-bar.component';
import { ChatUserListComponent } from './components/chat-user-list/chat-user-list.component';
import { ChatUserModalComponent } from './modals/chat-user-modal/chat-user-modal.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { DirectoryModalComponent } from './modals/directory-modal/directory-modal.component';
// import { FinderComponent } from './components/finder/finder.component';
import { HttpClientModule } from '@angular/common/http'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
// import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatToolbarModule } from '@angular/material/toolbar'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewComponent } from './components/overview/overview.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ProfilComponent } from './components/profil/profil.component';
// import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from './modules/shared/shared.module';
import { SideBarLeftComponent } from './components/side-bar-left/side-bar-left.component';
import { SideBarRightComponent } from './components/side-bar-right/side-bar-right.component';
import { TokenInterceptorProvider } from './helpers/token.interceptor';
import { UserComponent } from './components/user/user.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component'
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherModalComponent } from './modals/weather-modal/weather-modal.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: `${environment.API_URL}`, options: {} };

@NgModule({
  declarations: [

    AppComponent,
    UserComponent,


    AgePipe,
    DirectoryComponent,
    WeatherComponent,
    UserModalComponent,
    DirectoryModalComponent,
    WeatherModalComponent,
    OverviewComponent,
    SideBarLeftComponent,
    SideBarRightComponent,
    ChatComponent,
    ProfilComponent,
    ChatUserListComponent,
    ChatRoomComponent,
    ChatTopBarComponent,
    ChatUserModalComponent,

  ],
  imports: [
    SharedModule,
    MatBadgeModule,
    PickerModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
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
    BrowserModule,
    // MatIconModule,
    // MatButtonModule,
    // MatAutocompleteModule,
    // ReactiveFormsModule,
    // MatInputModule,
    FormsModule,
    // MatListModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  exports:[
    SharedModule
  ],

  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
