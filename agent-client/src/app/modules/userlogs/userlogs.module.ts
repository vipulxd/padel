import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs/logs.component';
import {UserlogsRoutingModule} from "./userlogs-routing.module";



@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
      UserlogsRoutingModule
  ]
})
export class UserlogsModule { }
