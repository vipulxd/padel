import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {LOCATIONINFO} from "../interfaces/interfaces";
import {locationApi,deviceInfo} from "../enums/enum";
import {Device, DeviceId} from "@capacitor/device";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public info : string;
    public url: string = environment.developement_backend_url
    public show : EventEmitter<boolean> =  new EventEmitter<boolean>()
    constructor(
        private _http: HttpClient,
        private _authService : AuthenticationService
    ) {
       Device.getId().then(val=>this.info = val.uuid)
    }

    public async  sendLocationToServer(coordinates: LOCATIONINFO) {
      coordinates.device_id = this.info;
      JSON.stringify(coordinates)
        this._http.request("POST",this.url+locationApi.location, { body:coordinates}).subscribe((val)=>{
            console.log(`Location ${val} is being sent to server`)
        }, (e)=> {
          console.log(e)
        })
    }
    public async getDeviceInfo(){
      Device.getId().then(res=>{
        this._http.request("GET",this.url+deviceInfo.getDeviceInfo+res.uuid).subscribe((val)=>{
        },(e)=>{
          if(e.status === 404){
            this._authService.isAuthenticated.emit(false)
          }
        })
      })

    }
}




