import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    public token : string = localStorage.getItem('token');
  constructor(private _authservice : AuthenticationService) {
  }
  ngOnInit(){
      if(this.token != null){
          this._authservice.isAuthenticated.emit(true)
      }else {
          this._authservice.isAuthenticated.emit(false)
      }
    }
}
