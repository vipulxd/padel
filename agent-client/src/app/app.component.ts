import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import { Device } from '@capacitor/device';
// Suppress the long press gesture inside the app
import { SuppressLongpressGesture } from 'capacitor-suppress-longpress-gesture';
import {ApiService} from "./services/api.service";
import {LocationService} from "./services/location.service";
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
              private _apiService : ApiService,
              private _locationService : LocationService
              ) {
  }

    public logDeviceInfo = async () => {
        const info = await Device.getId();
        console.log(info);
    };
  ngOnInit(){

this.logDeviceInfo()
      if(this.token != null){
          this._authservice.isAuthenticated.emit(true)
      }else {
          this._authservice.isAuthenticated.emit(false)
      }
      this._apiService.show.subscribe(val =>{
          if(val){
              setTimeout(()=>{
                  this.show = false;
              },5000)
          }
          this.show =val;
      })
      this._authservice.show.subscribe(val =>{
          if(val){
              setTimeout(()=>{
                  this.show = false;
              },5000)
          }
          this.show = val;
      })
      this._locationService.show.subscribe(val=>{
          if(val){
              setTimeout(()=>{
                  this.show = false;
              }, 5000)

          }
          this.show = val;
      })
    }
}
