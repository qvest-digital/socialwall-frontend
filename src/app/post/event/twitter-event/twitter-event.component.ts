import { Component, OnInit } from '@angular/core';
import {AbstractEvent} from '../AbstractEvent';

@Component({
  selector: 'app-twitter-event',
  templateUrl: './twitter-event.component.html',
  styleUrls: ['./twitter-event.component.scss']
})
export class TwitterEventComponent extends AbstractEvent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
