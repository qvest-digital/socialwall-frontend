import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressEventComponent } from './wordpress-event.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('WordpressEventComponent', () => {
  let component: WordpressEventComponent;
  let fixture: ComponentFixture<WordpressEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressEventComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
