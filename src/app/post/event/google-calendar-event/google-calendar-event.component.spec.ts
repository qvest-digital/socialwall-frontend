import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCalendarEventComponent } from './google-calendar-event.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('GoogleCalendarEventComponent', () => {
  let component: GoogleCalendarEventComponent;
  let fixture: ComponentFixture<GoogleCalendarEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCalendarEventComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
