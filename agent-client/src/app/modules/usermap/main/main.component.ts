import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from 'src/app/services/location.service';
import {AuthenticationService} from "../../../services/authentication.service";
import {LOCATIONINFO} from "../../../interfaces/interfaces";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  public coords: [LOCATIONINFO] = [{lat: 0, lng: 0, acc: 0, createdAt: ''}];
  public updatingLocation: boolean = false;
  public isAuthenticated: boolean;
  public pickupLocations: any;

  constructor(private locationService: LocationService,
              private _authservice: AuthenticationService
  ) {
  }

  public icon = {
    scaledSize: {
      width: 45,
      height: 45,
    },
    url: './../../assets/icons/locationMarker.svg',
  };
  public pickupLocationsImage = {
    scaledSize: {
      width: 40,
      height: 40
    },
    url: './../../assets/icons/pickup.png'
  }

  ngOnInit(): void {
    /**
     * set loader
     */
    this._authservice.isAuthenticated.subscribe((val) => {
      this.isAuthenticated = val;
      if (val) {
        this.locationService.getCurrentLocation()
      }
    })

    /**
     * start continuous locations watch
     */
    this.locationService.coordinates.subscribe((val: LOCATIONINFO) => {
      if (this.coords[0].lat === 0) {
        this.coords.pop()
      }
      this.coords.push(val)
    });
    /**
     * Request for a single location update
     */
    this.locationService.getCurrentLocation();
    /**
     * Get status of location updates
     */
    this.updatingLocation = this.locationService.isUpdatingLocation;
    /**
     * Start pickup locations
     */
    this.locationService.fetchPickupLocations()
    /**
     * Get locations
     */
    this.locationService.getPickupLocation().subscribe(val => {
      this.pickupLocations = val;
    },(e)=>{
        this._authservice.show.emit(true);
        this._authservice.isAuthenticated.emit(false)
    })
  }

  public requestLocationUpdate() {

    this.updatingLocation = true;
    this.locationService.startLocationTracking();

  }

  updateStatus(id: string, event: any) {
    this.locationService.updateTaskStatus(id, event.target.value)
  }

  public requestStopLocationUpdates() {
    this.updatingLocation = false;
    this.locationService.stopLocationTracking();
  }

  public getLocAcc(): number {
    /**
     * SET location zoom as per the accuracy of the location
     */
    if (this.coords[this.coords.length - 1].acc < 10) {
      return 20
    } else if (this.coords[this.coords.length - 1].acc < 20) {
      return 18
    } else if (this.coords[this.coords.length - 1].acc < 30) {
      return 16
    } else {
      return 15
    }
  }

  ngOnDestroy() {
    this.locationService.stopFetchPick()
  }

  ngAfterViewInit(): void {
    this.locationService.getCurrentLocation();
  }
}
