import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-snackbar',
  template:`
  <div *ngIf="show" class="container-wra">
      <div class="box ">
          Failed to send request! Please login
      </div>
  </div>
  `,
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
@Input() show : boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
