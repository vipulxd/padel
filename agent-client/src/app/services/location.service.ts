import {Injectable, EventEmitter} from '@angular/core';
import {Subscription, interval, Observable} from 'rxjs';
import {Geolocation} from '@capacitor/geolocation';
import {ApiService, LOCATIONINFO} from "./api.service";

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    public isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isUpdatingLocation: boolean = false;
    // location callback id
    public id: any;
    coordinates: EventEmitter<LOCATIONINFO> = new EventEmitter<LOCATIONINFO>();
    // current valid location fetched
    public currentLocationInfo: LOCATIONINFO;
    // location captured 60 Meters before
    public previousLocationInfo: LOCATIONINFO;
    // internal locations fetched from coordinates
    public internalLocationInfo: LOCATIONINFO;
    private intervalSubscriber: Subscription = new Subscription();

    constructor(private _api: ApiService) {
    }

    async getPosition() {
        await Geolocation.getCurrentPosition().then((pos) => {
            if (pos) {
                this.currentLocationInfo = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    createdAt: pos.timestamp.toString()
                };
                if (this.previousLocationInfo) {
                    /**
                     * If location from GPS is > 50 acc. discard
                     */
                    this.internalLocationInfo = this.currentLocationInfo;

                    if (this.previousLocationInfo != this.currentLocationInfo) {
                        this.coordinates.emit(this.currentLocationInfo);
                        var distanceFromPrevious = this.distance(
                            this.previousLocationInfo.lat,
                            this.previousLocationInfo.lng,
                            this.currentLocationInfo.lat,
                            this.currentLocationInfo.lng
                        );

                        if (distanceFromPrevious >= 60) {
                            if (pos.coords.accuracy < 40) {
                                this._api.sendLocationToServer(this.currentLocationInfo)
                                this.previousLocationInfo = this.currentLocationInfo;
                            }
                        } else {
                            console.log(
                                `Agent travelled ${distanceFromPrevious}M discarding with accuracy ${pos.coords.accuracy}`
                            );
                        }
                    }
                }
            } else {
                this.sendInitialLocationToServer(this.currentLocationInfo)
            }
        });

    }

    public async sendInitialLocationToServer(coords: LOCATIONINFO) {
        this.previousLocationInfo = coords;
        this._api.sendLocationToServer(coords)
    }

    public getCurrentLocation() {
        this.isLoading.emit(true);
        Geolocation.getCurrentPosition()
            .then((pos) => {
                this.isLoading.emit(false);
                this.coordinates.emit({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    createdAt: pos.timestamp.toString()
                });
            })
            .catch((err) => {
                return {lat: 0, lng: 0};
            });
    }

    distance(lat1: number, lon1: number, lat2: number, lon2: number) {
        if (lat1 == lat2 && lon1 == lon2) {
            return 0;
        } else {
            var radlat1 = (Math.PI * lat1) / 180;
            var radlat2 = (Math.PI * lat2) / 180;
            var theta = lon1 - lon2;
            var radtheta = (Math.PI * theta) / 180;
            var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 0.8684;
        }

        return dist;
    }

    public startLocationTracking(): void {
        this.isUpdatingLocation = true;
        // get location updates in every 10 seconds
        this.intervalSubscriber = interval(5000).subscribe(() =>
            this.getPosition()
        );
    }

    public stopLocationTracking(): void {
        this.isUpdatingLocation = false;
        this.intervalSubscriber.unsubscribe();
    }
}
