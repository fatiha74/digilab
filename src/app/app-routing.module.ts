import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatUserListComponent } from './components/chat-user-list/chat-user-list.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserGuard } from './user.guard';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent
    //  path: '**', component: RouteNotFoundComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'overview', component: OverviewComponent,
    // les enfants de overview il faudra mettre overview/register par exemple
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'directory', component: DirectoryComponent },
      {
        path: 'chat', component: ChatComponent,
        children: [
          { path: 'user', component: ChatUserListComponent },
          { path: 'chatroom', component: ChatRoomComponent },

        ]
      },

      { path: 'directory', component: DirectoryComponent },

      { path: 'profil', component: ProfilComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
