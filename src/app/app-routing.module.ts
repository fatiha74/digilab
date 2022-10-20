import { RouterModule, Routes } from '@angular/router';

import { DirectoryComponent } from './components/directory/directory.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserGuard } from './user.guard';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent
  },
  {
    path: 'overview', component: OverviewComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'directory', component: DirectoryComponent },
      { path: 'user', component: UserComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
