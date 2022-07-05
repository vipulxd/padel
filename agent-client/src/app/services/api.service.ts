import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {observable, Observable, Subscription} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url: string = environment.developement_backend_url
    private data: LOCATIONRESPONSE[];

    constructor(
        private _http: HttpClient
    ) {
    }

    public sendLocationToServer(coordinates: LOCATIONINFO) {
        JSON.stringify(coordinates)
        this._http.request("POST",this.url, { body:coordinates}).subscribe((val)=>{
            console.log(`Location ${val} is being sent to server`)
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
