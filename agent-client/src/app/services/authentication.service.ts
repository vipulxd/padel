import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AUTHAPI} from '../enums/enum'
import {AUTHRESPONSE} from "../interfaces/interfaces";
import {LocationService} from "./location.service";
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public isAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
    public url: string = environment.developement_backend_url
   public errorString : EventEmitter<string> = new EventEmitter<string>();
    public name : string ;
    public isLoading : EventEmitter<boolean> =  new EventEmitter<boolean>();
    constructor(private http: HttpClient
                ) {
    }

    public login(e: string, p: string) {
        const data = {
            username: e,
            password: p
        }
        this.isLoading.emit(true)
        JSON.stringify(data)
        this.http.request('POST', `${this.url}${AUTHAPI.login}`, {body: data}).subscribe((response:AUTHRESPONSE) => {
            localStorage.setItem('token',response.token)
            localStorage.setItem('name',response.name)
            this.isAuthenticated.emit(true)
            this.isLoading.emit(false)
        }, (err) => {
           this.errorString.emit(err.error.message)
            this.isLoading.emit(false)
        },()=>{
            this.isLoading.emit(false)
        })

    }
}


