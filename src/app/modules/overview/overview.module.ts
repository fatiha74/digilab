import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ChatRoomComponent } from './../../components/chat-room/chat-room.component';
import { ChatTopBarComponent } from './../../components/chat-top-bar/chat-top-bar.component';
import { ChatUserListComponent } from './../../components/chat-user-list/chat-user-list.component';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './../../components/directory/directory.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './../../components/overview/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { ProfilComponent } from './../../components/profil/profil.component';
import { SharedModule } from '../shared/shared.module';
import { SideBarLeftComponent } from './../../components/side-bar-left/side-bar-left.component';
import { SideBarRightComponent } from './../../components/side-bar-right/side-bar-right.component';
import { WeatherComponent } from './../../components/weather/weather.component';

@NgModule({
  declarations: [
    OverviewComponent,
    ChatComponent,
    DirectoryComponent,
    ProfilComponent,
    ChatTopBarComponent,
    ChatRoomComponent,
    ChatUserListComponent,
    SideBarLeftComponent,
    SideBarRightComponent,
    ProfilComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],

})
export class OverviewModule { }
