import {EventEmitter, Injectable} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {Geolocation} from '@capacitor/geolocation';
import {ApiService} from "./api.service";
import {AuthenticationService} from "./authentication.service";
import {LOCATIONINFO, LOCATIONRESPONSE} from "../interfaces/interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {locationApi, pickupStatus} from "../enums/enum";
import {Storage} from "@capacitor/storage";
import {Network} from "@capacitor/network";

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    public isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isUpdatingLocation: boolean = false;
    // location callback id
    public id: any;
    coordinates: EventEmitter<LOCATIONINFO> = new EventEmitter<LOCATIONINFO>();
    public logs: EventEmitter<LOCATIONRESPONSE[]> = new EventEmitter<LOCATIONRESPONSE[]>()
    // current valid location fetched
    public currentLocationInfo: LOCATIONINFO;
    // location captured 60 Meters before
    public previousLocationInfo: LOCATIONINFO;
    // internal locations fetched from coordinates
    public internalLocationInfo: LOCATIONINFO;
    public isConnectedToInternet : EventEmitter<boolean> = new EventEmitter<boolean>() ;
    private intervalSubscriber: Subscription = new Subscription();
    public pickupintervalSubscriber: Subscription = new Subscription();
    private loggerSubscriber: Subscription = new Subscription();
    public errorString : EventEmitter<string> =  new EventEmitter<string>()
    public AUTHTOKEN: string = localStorage.getItem('token')
    private isLoggedIn: boolean;
    public show : EventEmitter<boolean> =  new EventEmitter<boolean>()
    constructor(private _api: ApiService,
                private _authservice: AuthenticationService,
                private _http: HttpClient
    ) {
        this._authservice.isAuthenticated.subscribe(val => {
            this.isLoggedIn = val;
        })
        this.AUTHTOKEN = localStorage.getItem('token');
        if (this.AUTHTOKEN == null) {
            Storage.get({key: 'token'}).then(finalToken => {
                // @ts-ignore
                this.AUTHTOKEN = finalToken
            })
        }
    }
    public  logCurrentNetworkStatus = async () => {
        const status = await Network.getStatus();
        if(!status.connected){
            this.errorString.emit('No network detected')
            this.show.emit(true)
            this.isConnectedToInternet.emit(false);
        }
        this.isConnectedToInternet.emit(true)
    };
    async getPosition() {
        this.logCurrentNetworkStatus();
        this.isLoggedIn && await Geolocation.getCurrentPosition().then((pos) => {
            if (pos) {
                this.currentLocationInfo = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    createdAt: pos.timestamp.toString()
                };
                if (this.previousLocationInfo) {

                    /**
                     * If location from GPS is > 35 acc. discard
                     */
                    this.internalLocationInfo = this.currentLocationInfo;

                    console.log(`location ${pos.coords} with time stamp ${pos.timestamp}`)
                    if (this.previousLocationInfo != this.currentLocationInfo) {
                        var distanceFromPrevious = LocationService.distance(
                            this.previousLocationInfo.lat,
                            this.previousLocationInfo.lng,
                            this.currentLocationInfo.lat,
                            this.currentLocationInfo.lng
                        );

                        if (distanceFromPrevious >= 60 && pos.coords.accuracy < 40) {
                            this._api.sendLocationToServer(this.currentLocationInfo)
                            this.coordinates.emit(this.currentLocationInfo);
                            this.previousLocationInfo = this.currentLocationInfo;
                        } else {
                            console.log(
                                `Agent travelled ${distanceFromPrevious}M discarding with accuracy ${pos.coords.accuracy}`
                            );
                        }
                    }
                } else {
                    this.sendInitialLocationToServer(this.currentLocationInfo)
                }
            }
        });

    }

    public getPickupLocation(): Observable<any> {
        let fromDate = new Date().toLocaleDateString('zh-Hans-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replaceAll('/', '-')
        fromDate = fromDate + 'T01:00:00.000Z';
        const headers = new HttpHeaders({'x-access-token': this.AUTHTOKEN})
        return this._http.request('GET', `${environment.developement_backend_url}${locationApi.pickup}${fromDate}`, {headers})

    }

    public async sendInitialLocationToServer(coords: LOCATIONINFO) {
        this.previousLocationInfo = coords;
        this._api.sendLocationToServer(coords)
    }

    public getCurrentLocation() {
        this.isLoading.emit(true);
        this.isLoggedIn && Geolocation.getCurrentPosition()
            .then((pos) => {

                this.currentLocationInfo = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    createdAt: pos.timestamp.toString()
                };
                this.isLoading.emit(false);
                this.coordinates.emit({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    createdAt: pos.timestamp.toString()
                });
            })
            .catch(() => {
                this.isLoading.emit(false);
                return {lat: 0, lng: 0};
            });
    }

    public getLocationHistory() {
        let id = 1;
        this._api.getLocationFromServer(id).subscribe((val: LOCATIONRESPONSE[]) => {
            this.logs.emit(val)
        })
    }

    private static distance(lat1: number, lon1: number, lat2: number, lon2: number) {
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
            dist = dist * 1000
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

    public fetchPickupLocations(): void {
        this.pickupintervalSubscriber = interval(60000).subscribe(() =>
            this.getPickupLocation()
        )
    }

    public stopFetchPick(): void {
        this.pickupintervalSubscriber.unsubscribe()
    }

    public stopRealTimeLocationUpdates(): void {
        this.loggerSubscriber.unsubscribe()
    }

    /**
     * Stop the location Tracking when user presses the STOP button
     */
    public stopLocationTracking(): void {
        this.isUpdatingLocation = false;
        this.intervalSubscriber.unsubscribe();
    }

    public updateTaskStatus(id: string, status: string , lat:string , lng: string) {
        const distance = LocationService.distance(this.currentLocationInfo.lat,this.currentLocationInfo.lng,Number(lat),Number(lng));
        if(status == pickupStatus.completed && distance > 30){
            this.show.emit(true)
            this.errorString.emit('Update not allowed. You are too far from destination')
            return
        }
        const headers = new HttpHeaders({'x-access-token': this.AUTHTOKEN})
        const data = {status}
        JSON.stringify(data)
        this._http.request('POST', environment.developement_backend_url + locationApi.updateStatus + id, {
            headers,
            body: data
        }).subscribe(val=>{
            console.log(val)
        })
    }

}


