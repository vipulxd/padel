import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../services/location.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
public isLoading : boolean = false;
  constructor(
      private authService : AuthenticationService,
      private locationService : LocationService) { }

  ngOnInit(): void {
      this.locationService.isLoading.subscribe((val: boolean)=>{

          this.isLoading = val
      })
      this.authService.isLoading.subscribe((val: boolean)=>{
          this.isLoading = val;
      })

  }

}
