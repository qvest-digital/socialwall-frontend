import { Component, OnInit } from '@angular/core';
import {AbstractEvent} from '../AbstractEvent';

@Component({
  selector: 'app-instagram-event',
  templateUrl: './instagram-event.component.html',
  styleUrls: ['./instagram-event.component.scss']
})
export class InstagramEventComponent extends AbstractEvent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
