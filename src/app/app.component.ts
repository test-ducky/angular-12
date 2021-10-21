import { Component, OnInit } from '@angular/core';
import { Utils } from '../utils';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getCurrentMonth(): string {
    return Utils.getDate().toLocaleString('default', { month: 'long' });
  }
}
