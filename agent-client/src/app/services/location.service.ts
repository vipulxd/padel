import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  coordinates: EventEmitter<LOCATION> = new EventEmitter<LOCATION>();
  public data: LOCATION = { lat: 0, lng: 0 };
  private intervalSubscriber: Subscription = new Subscription();
  constructor() {}
  getPosition(): void {
    navigator.geolocation.getCurrentPosition(
      (resp) => {
        this.data = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        };

        this.coordinates.emit(this.data);
      },

      (err) => {
        console.error(err);
      }
    );
  }
  public startLocationTracking(): void {
    this.intervalSubscriber = interval(1000).subscribe(() =>
      this.getPosition()
    );
  }
  public stopLocationTracking(): void {
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe();
    }
  }
}
export interface LOCATION {
  lat: number;
  lng: number;
}
