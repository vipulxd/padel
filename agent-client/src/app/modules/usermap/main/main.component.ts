import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LOCATION, LocationService} from 'src/app/services/location.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
    public coords: [LOCATION] = [{lat: 0, lng: 0}];
    public mockdata : LOCATION[] = [
        {
            lat: 28.62980871695189,
            lng: 77.38009929656982
        },
        {
            lat: 28.629846385193826,
            lng: 77.37936973571779
        },
        {
            lat: 28.629921721637164,
            lng: 77.37868309020998
        },
        {
            lat: 28.629997058026408,
            lng: 77.37786769866945
        },
        {
            lat: 28.629997058026408,
            lng: 77.37700939178468
        }
    ]

    constructor(private locationService: LocationService) {
    }

    icon = {
        scaledSize: {
            width: 50,
            height: 50
        }, url: './../../assets/icons/cycle.svg'
    }

    ngOnInit(): void {
        if (this.coords[0].lat == 0) {
            // remove redundant locations on component mount
            this.coords.pop()
            this.coords.push(this.locationService.internalLocationInfo)
        }

        this.locationService.coordinates.subscribe((val: LOCATION) => {
            if (val.lat !== this.coords[this.coords.length - 1].lat) {
                if (this.coords[0].lat == 0) {
                    this.coords.pop()
                }
                this.coords.push(val);
            }
        });
    }
    public requestLocationUpdate(){
        this.locationService.startLocationTracking();
    }
    public requestStopLocationUpdates(){
        this.locationService.stopLocationTracking();
    }
    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
        this.coords = [{lat: 0, lng: 0}]
    }
}
