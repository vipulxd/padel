import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './shared/login/login.component';
import {SnackbarComponent} from "./shared/snackbar/snackbar.component";


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        SnackbarComponent,
        SnackbarComponent,

    ],
  imports: [
    BrowserModule,
      HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
