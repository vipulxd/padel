import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import * as L from 'leaflet';
import {LOCATIONINFO} from "../../../interfaces/interfaces";


const iconUrl = './../../assets/icons/locationMarker.svg'
const iconDefault = L.icon({

    iconUrl,

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
    public coords: [LOCATIONINFO] = [{lat : 0,lng:0, acc:0,createdAt:''}] ;
    public updatingLocation: boolean = false;
    map:any;
    constructor(private locationService: LocationService) {}

    public icon = {
        scaledSize: {
            width: 30,
            height: 30,
        },
        url: './../../assets/icons/locationMarker.svg',
    };

    ngOnInit(): void {
        this.map = L.map("map").setView([46.879966, -121.726909] ,18);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        /**
         * set loader
         */
        /**
         * start continuous locations watch
         */
        this.locationService.coordinates.subscribe((val: LOCATIONINFO) => {
            if(this.coords[0].lat ===0){
                this.coords.pop()
            }
            this.coords.push(val)
            this.updateMarker()
        });
        /**
         * Request for a single location update
         */
        this.locationService.getCurrentLocation();
        /**
         * Get status of location updates
         */
        this.updatingLocation = this.locationService.isUpdatingLocation;
        this.requestLocationUpdate()
    }

    public updateMarker() {
        this.map.panTo(new L.LatLng(this.coords[0].lat, this.coords[0].lng),10);
        L.marker([this.coords[0].lat, this.coords[0].lng],this.icon).addTo(this.map);
        // L.map("map").setView([this.coords[0].lat, this.coords[0].lng], 10)
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
