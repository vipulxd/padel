import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public isAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
    public url: string = environment.developement_backend_url
   public errorString : EventEmitter<string> = new EventEmitter<string>();
    public name : string ;
    constructor(private http: HttpClient) {
    }

    public login(e: string, p: string) {
        const data = {
            username: e,
            password: p
        }
        JSON.stringify(data)
        this.http.request('POST', `${this.url}${AUTHAPI.login}`, {body: data}).subscribe((response:AUTHRESPONSE) => {
            localStorage.setItem('token',response.token)
            localStorage.setItem('name',response.name)
            this.isAuthenticated.emit(true)
        }, (err) => {
           this.errorString.emit(err.error.message)
        })

    }
}

enum AUTHAPI {
    login = '/api/agent/login',
    register = '/api/agent/register'
}
interface AUTHRESPONSE {
    admin_id: string
    agent_id:string
    createdat: string
    name: string
    password: string
    role:string
    token: string
    username:string
}
