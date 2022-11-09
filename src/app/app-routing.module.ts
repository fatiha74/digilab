import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { ChatGuard } from './chat.guard';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatUserListComponent } from './components/chat-user-list/chat-user-list.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { FinderComponent } from './components/finder/finder.component';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './modules/login/login.module';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserGuard } from './user.guard';
import { UserResolver } from './resolvers/user.resolver';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent
    //  path: '**', component: RouteNotFoundComponent
  },
  //
  //avant { path: 'login', component: LoginComponent },
    { path: 'login', loadChildren:()=>import('./modules/login/login.module')
  .then(m=>m.LoginModule)},
  // { path: 'register', component: RegisterComponent },
  { path: 'register', loadChildren:()=>import('./modules/register/register.module')
  .then(m=>m.RegisterModule) },

  { path: 'finder', loadChildren:()=>import('./modules/finder/finder.module')
  .then(m=>m.FinderModule)},
  {
    path: 'overview', component: OverviewComponent, canActivate: [AuthGuard],
    // les enfants de overview il faudra mettre overview/register par exemple
    children: [
      // { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
      { path: 'directory', component: DirectoryComponent, canActivate: [AuthGuard] },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard], resolve: { profile: UserResolver } },
      { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
