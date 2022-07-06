import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {observable, Observable, Subscription} from "rxjs";
import {AuthenticationService} from "./authentication.service";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url: string = environment.developement_backend_url
    private data: LOCATIONRESPONSE[];

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


export interface LOCATIONINFO {
    lat: number,
    lng: number,
    createdAt: string,
    acc: number,
}
export interface LOCATIONRESPONSE {
    accuracy: number
    agent_id: number
    createdat: string
    id: number
    latitude: number
    longitude: number
}
enum locationApi {
    location = '/api/agent/location'
}
