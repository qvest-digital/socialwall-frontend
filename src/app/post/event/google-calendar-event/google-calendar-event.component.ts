import {Component, OnInit} from '@angular/core';
import {AbstractEvent} from '../AbstractEvent';

@Component({
  selector: 'app-google-calendar-event',
  templateUrl: './google-calendar-event.component.html',
  styleUrls: ['./google-calendar-event.component.scss']
})
export class GoogleCalendarEventComponent extends AbstractEvent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public parseLocation() {

    const locationParsed = this.socialPost.location.split(' (');
    return locationParsed[0];
  }

}
