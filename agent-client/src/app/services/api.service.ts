import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule,} from "@angular/common/http";
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
        this._http.post(this.url, coordinates).subscribe((res: any) => {
            console.log("locations is sent")
        }, (e) => {
            console.error('location cannot be sent to server')
        })
    }
}

export interface LOCATIONINFO {
    lat: number,
    lng: number,
    createdAt: string,
    acc: number,
}
