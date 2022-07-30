import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AUTHAPI} from '../enums/enum'
import {AUTHRESPONSE} from "../interfaces/interfaces";
import {Device, DeviceId} from "@capacitor/device";
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
  public info : Promise<DeviceId>;
    public isAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
    public url: string = environment.developement_backend_url
    public errorString : EventEmitter<string> = new EventEmitter<string>();
    public name : string ;
    public show : EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private http: HttpClient
                ) {
      this.info =  Device.getId();
    }

    public login(e: string, p: string) {

      Device.getId().then(res=> {
        const data = {
          username: e,
          password: p,
          device_id : res.uuid
        }
        JSON.stringify(data)
        this.http.request('POST', `${this.url}${AUTHAPI.login}`, {body: data}).subscribe((response: AUTHRESPONSE) => {
          this.isAuthenticated.emit(true)
          this.show.emit(false)
        }, (err) => {
          this.errorString.emit(err.error.message)
        }, () => {
        })
      })
    }

}


