import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramEventComponent } from './instagram-event.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('InstagramEventComponent', () => {
  let component: InstagramEventComponent;
  let fixture: ComponentFixture<InstagramEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramEventComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
