import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

// Suppress the long press gesture inside the app
import { SuppressLongpressGesture } from 'capacitor-suppress-longpress-gesture';
import {ApiService} from "./services/api.service";
SuppressLongpressGesture.activateService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    public token : string = localStorage.getItem('token');
    public show : boolean = false;
  constructor(private _authservice : AuthenticationService,
              private _apiService : ApiService
              ) {
  }
  ngOnInit(){
      if(this.token != null){
          this._authservice.isAuthenticated.emit(true)
      }else {
          this._authservice.isAuthenticated.emit(false)
      }
      this._apiService.show.subscribe(val =>{
          console.log(val)
          this.show =val;
      })
      this._authservice.show.subscribe(val =>{
          this.show = val;
      })
    }
}
