import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermapRoutingModule } from './usermap-routing.module';
import {AgmCoreModule} from "@agm/core";
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    UsermapRoutingModule,
    AgmCoreModule
  ]
})
export class UsermapModule { }
