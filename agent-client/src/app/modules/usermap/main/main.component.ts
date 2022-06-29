import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LOCATION, LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  public coords: [LOCATION] = [{ lat: 0, lng: 0 }];
  public updatingLocation: boolean = false;

  constructor(private locationService: LocationService) {}

  public icon = {
    scaledSize: {
      width: 50,
      height: 50,
    },
    url: './../../assets/icons/location.svg',
  };
  ngOnInit(): void {
    /**
     * set loader
     */
    /**
     * start continuous locations watch
     */
    this.locationService.coordinates.subscribe((val: LOCATION) => {
      if (this.coords[0].lat == 0) {
        this.coords.pop();
      }
      this.coords.push(val);
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
