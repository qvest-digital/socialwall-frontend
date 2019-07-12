import {Component, OnInit} from '@angular/core';
import {AbstractEvent} from '../AbstractEvent';

@Component({
  selector: 'app-wordpress-event',
  templateUrl: './wordpress-event.component.html',
  styleUrls: ['./wordpress-event.component.scss']
})
export class WordpressEventComponent  extends AbstractEvent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
