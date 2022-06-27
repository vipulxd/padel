import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 public lat :  number = 51.678418 ;
 public lng : number =  7.809007 ;
  constructor(private locationService : LocationService) { }
  public iconUrl = "http://maps.google.com/mapfiles/ms/icons/cycling.png";

  ngOnInit(): void {
    this.locationService.getPosition().then(pos=>
      {
         this.lat= pos.lat
         this.lng = pos.lng
      });
    
  }
}
