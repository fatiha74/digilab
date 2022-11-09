import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/helpers/auth.guard';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { DirectoryComponent } from 'src/app/components/directory/directory.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { ProfilComponent } from 'src/app/components/profil/profil.component';
import { UserResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [{
  path: '', component: OverviewComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
