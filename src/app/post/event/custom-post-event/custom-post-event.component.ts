import {Component, OnInit} from '@angular/core';
import {AbstractEvent} from '../AbstractEvent';

@Component({
  selector: 'app-custom-post-event',
  templateUrl: './custom-post-event.component.html',
  styleUrls: ['./custom-post-event.component.scss']
})
export class CustomPostEventComponent  extends AbstractEvent  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
