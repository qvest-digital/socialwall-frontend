import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPostEventComponent } from './custom-post-event.component';

describe('CustomPostEventComponent', () => {
  let component: CustomPostEventComponent;
  let fixture: ComponentFixture<CustomPostEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPostEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPostEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
