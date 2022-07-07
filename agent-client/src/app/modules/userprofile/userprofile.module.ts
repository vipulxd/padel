import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';

import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule
  ]
})
export class UserprofileModule { }
