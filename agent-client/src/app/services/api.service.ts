import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url: string = environment.developement_backend_url

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
}

export interface LOCATIONINFO {
    lat: number,
    lng: number,
    createdAt: string,
    acc: number,
}
