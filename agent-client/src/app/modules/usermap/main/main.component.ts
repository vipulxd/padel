import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { LOCATION, LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  public coords: [LOCATION] = [{ lat: 0, lng: 0 }];
  constructor(private locationService: LocationService) {}
  public iconUrl = 'http://maps.google.com/mapfiles/ms/icons/cycling.png';

  ngOnInit(): void {
    this.locationService.startLocationTracking();
    this.locationService.coordinates.subscribe((val: LOCATION) => {
      if (val.lat !== this.coords[this.coords.length - 1].lat) {
        this.coords.push(val);
      }
    });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.locationService.stopLocationTracking();
  }
}
