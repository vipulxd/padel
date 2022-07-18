import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {LOCATIONINFO} from "../interfaces/interfaces";
import {locationApi} from "../enums/enum";
import {Storage} from "@capacitor/storage";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url: string = environment.developement_backend_url
    public show : EventEmitter<boolean> =  new EventEmitter<boolean>()
    constructor(
        private _http: HttpClient,
        private _authService : AuthenticationService
    ) {
    }

    public async  sendLocationToServer(coordinates: LOCATIONINFO) {
        JSON.stringify(coordinates)
        let token = localStorage.getItem('token');
        let finalToken ;
        if( token == null ) {
            finalToken = await Storage.get({ key: 'token' });
            token = finalToken;
        }
        finalToken = token;
        const headers = new HttpHeaders({'x-access-token':finalToken})
        this._http.request("POST",this.url+locationApi.location, { body:coordinates, headers}).subscribe((val)=>{
            console.log(`Location ${val} is being sent to server`)
        }, (e)=> {
                this._authService.isAuthenticated.emit(false)
                this.show.emit(true)
        })
    }

    public  getLocationFromServer(id: number): Observable<any> {
     return this._http.request('GET',this.url)
    }

}




