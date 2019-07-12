import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCalendarComponent } from './google-calendar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SocialPost} from '../../interface/social-post';

describe('GoogleCalendarComponent', () => {
  let component: GoogleCalendarComponent;
  let fixture: ComponentFixture<GoogleCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCalendarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should same day', () => {

    const socialPost = {} as SocialPost;

    socialPost.start = new Date().getDate();
    socialPost.end = new Date().getDate();

    const returnValue = component.sameDay(socialPost);

    expect(returnValue).toBe(true);
  });
});
