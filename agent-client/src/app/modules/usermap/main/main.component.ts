import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import {LOCATIONINFO} from "../../../services/api.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  public coords: LOCATIONINFO = {lat : 0,lng:0, acc:0,createdAt:''} ;
  public updatingLocation: boolean = false;

  constructor(private locationService: LocationService) {}

  public icon = {
    scaledSize: {
      width: 50,
      height: 50,
    },
    url: './../../assets/icons/locationMarker.svg',
  };
  ngOnInit(): void {
    /**
     * set loader
     */
    /**
     * start continuous locations watch
     */
    this.locationService.coordinates.subscribe((val: LOCATIONINFO) => {
     this.coords = val
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
  ngAfterViewInit(): void {
    this.locationService.getCurrentLocation();
  }
}
