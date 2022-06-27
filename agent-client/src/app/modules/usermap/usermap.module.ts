import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermapRoutingModule } from './usermap-routing.module';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MapComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    UsermapRoutingModule
  ]
})
export class UsermapModule { }
