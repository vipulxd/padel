import {AfterViewInit, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent    {
public isAuthenticated : boolean ;
public isActive : boolean = false
public errorString : string ;
public token : string = localStorage.getItem('token')
  constructor(private _authservice : AuthenticationService) { }
ngOnInit(){
    this._authservice.isAuthenticated.subscribe(val=>{
        this.isAuthenticated = val
    })
   this._authservice.errorString.subscribe((val : string)=>{
       this.isActive = false;
       this.errorString = val
   })

   if(this.token != null){
       this.isAuthenticated = true
   }else {
       this.isAuthenticated =  false;
   }
    console.log(this.isAuthenticated)
}
public setActive(){
    this.isActive = true;
}
public login(e: string,p:string){
    this._authservice.login(e,p)
}
}
