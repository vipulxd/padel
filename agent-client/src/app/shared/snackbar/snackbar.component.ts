import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-snackbar',
  template:`
  <div *ngIf="show" class="container-wra">
      <div class="box ">
          {{errorMessage}}
      </div>
  </div>
  `,
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
@Input() show : boolean;
public errorMessage : string = 'Failed to send request! Please Login'

  constructor(private locationService : LocationService) { }

  ngOnInit(): void {
    this.locationService.errorString.subscribe(val=>{
        this.errorMessage = val;
    })
  }

}
