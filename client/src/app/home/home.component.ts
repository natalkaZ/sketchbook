import { Component, OnInit } from '@angular/core';
import { fade } from 'app/shared/classes/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
