import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
public isLoading : boolean = true;
  constructor(private locationService : LocationService) { }

  ngOnInit(): void {
      this.locationService.isLoading.subscribe((val: boolean)=>{
          this.isLoading = val
      })
  }

}
