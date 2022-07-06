import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import {LOCATIONINFO} from "../../../services/api.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  public coords: [LOCATIONINFO] = [{lat : 0,lng:0, acc:0,createdAt:''}] ;
  public updatingLocation: boolean = false;
    public isAuthenticated : boolean ;
  constructor(private locationService: LocationService,
  private _authservice : AuthenticationService

  ) {}

  public icon = {
    scaledSize: {
      width: 30,
      height: 30,
    },
    url: './../../assets/icons/locationMarker.svg',
  };
  ngOnInit(): void {
    /**
     * set loader
     */
    this._authservice.isAuthenticated.subscribe((val)=>{
        this.isAuthenticated = val;
        if(val){
            this.locationService.getCurrentLocation()
        }
    })

    /**
     * start continuous locations watch
     */
    this.locationService.coordinates.subscribe((val: LOCATIONINFO) => {
        if(this.coords[0].lat ===0){
            this.coords.pop()
        }
     this.coords.push(val)
        console.log(this.coords)
    });
    /**
     * Request for a single location update
     */
    this.locationService.getCurrentLocation();
    /**
     * Get status of location updates
     */
    this.updatingLocation = this.locationService.isUpdatingLocation;
  }
  public requestLocationUpdate() {

          this.updatingLocation = true;
          this.locationService.startLocationTracking();

  }
  public requestStopLocationUpdates() {
    this.updatingLocation = false;
    this.locationService.stopLocationTracking();
  }
  public getLocAcc(): number {
      if (this.coords[this.coords.length - 1].acc < 10) {
          return 20
      } else if (this.coords[this.coords.length - 1].acc < 20) {
          return 18
      } else if (this.coords[this.coords.length - 1].acc < 30) {
          return 14
      } else {
          return 13
      }
  }
  ngAfterViewInit(): void {
    this.locationService.getCurrentLocation();
  }
}
