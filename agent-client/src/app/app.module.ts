import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './shared/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
      HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyDIbr4Jz-08WdE1GyCJ6m-QmfD2QP83vkk'
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
