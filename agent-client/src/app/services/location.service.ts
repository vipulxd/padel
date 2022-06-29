import {Injectable, EventEmitter} from '@angular/core';
import {Subscription, interval} from 'rxjs';
import {Geolocation, Position} from '@capacitor/geolocation';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    public isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
    public id: any;
    coordinates: EventEmitter<LOCATION> = new EventEmitter<LOCATION>();
    // current valid location fetched
    public currentLocationInfo: LOCATION = {lat: 0, lng: 0};
    // location captured 60 Meters before
    public previousLocationInfo: LOCATION = {lat: 0, lng: 0};
    // internal locations fetched from coordinates
    public internalLocationInfo: LOCATION = {lat: 0, lng: 0};
    private intervalSubscriber: Subscription = new Subscription();

    constructor() {
    }

    async getPosition() {
        this.isLoading.emit(true)
        this.id = Geolocation.watchPosition({}, (pos: Position | null, err) => {
            if (pos) {
                this.isLoading.emit(false)
                this.currentLocationInfo = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };

                this.internalLocationInfo = this.currentLocationInfo
                if (this.previousLocationInfo != this.currentLocationInfo) {
                    var distanceFromPrevious = this.distance(this.previousLocationInfo.lat, this.previousLocationInfo.lng, this.currentLocationInfo.lat, this.currentLocationInfo.lng)

                    if (distanceFromPrevious >= 60) {
                        this.previousLocationInfo = this.currentLocationInfo
                        this.coordinates.emit(this.currentLocationInfo);
                    } else {
                        console.log(`Agent travelled ${distanceFromPrevious}M discarding`)
                    }
                }
            }
        })

    }

    distance(lat1: number, lon1: number, lat2: number, lon2: number) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 0.8684
        }

        return dist;
    }

    public startLocationTracking(): void {
        // get location updates in every 10 seconds
        this.intervalSubscriber = interval(10000).subscribe(() =>
            this.getPosition()
        );
    }

    public stopLocationTracking(): void {
        if (this.id) {
            Geolocation.clearWatch({id: this.id});
        }
    }
}

export interface LOCATION {
    lat: number;
    lng: number;
}
