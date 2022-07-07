import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {LOCATIONINFO} from "../interfaces/interfaces";
import {locationApi} from "../enums/enum";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url: string = environment.developement_backend_url

    constructor(
        private _http: HttpClient,
        private _authService : AuthenticationService
    ) {
    }

    public sendLocationToServer(coordinates: LOCATIONINFO) {
        JSON.stringify(coordinates)
        const headers = new HttpHeaders({'x-access-token':localStorage.getItem('token')})
        this._http.request("POST",this.url+locationApi.location, { body:coordinates, headers}).subscribe((val)=>{
            console.log(`Location ${val} is being sent to server`)
        }, ()=> {
                this._authService.isAuthenticated.emit(false)
        })
    }

    public  getLocationFromServer(id: number): Observable<any> {
     return this._http.request('GET',this.url)
    }
}




