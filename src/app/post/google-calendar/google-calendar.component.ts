import {Component, Input, OnInit} from '@angular/core';
import {SocialPost} from '../../interface/social-post';

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {

  socialPostIndex = -1;

  @Input() googlePosts: SocialPost[];
  @Input()
  set selectComponent(socialPostIndex: number) {
    this.socialPostIndex = socialPostIndex;
  }

  constructor() { }

  ngOnInit() {
  }

  sameDay(item: SocialPost): boolean {
    const start = new Date(parseInt(item.start, 10) * 1000);
    const end = new Date(parseInt(item.end, 10) * 1000);
    return start.getDate() === end.getDate();
  }
}
