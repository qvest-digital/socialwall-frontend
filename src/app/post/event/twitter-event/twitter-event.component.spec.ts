import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterEventComponent } from './twitter-event.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TwitterEventComponent', () => {
  let component: TwitterEventComponent;
  let fixture: ComponentFixture<TwitterEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterEventComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
