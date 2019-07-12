import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BackendClientService} from '../backend/backend-client.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {of} from 'rxjs';

class MockInteractWithServerService {
  getNewPost() {
    return of([]);
  }
  getGooglePosts() {
    return of([]);
  }
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      providers: [
        {
          provide: BackendClientService,
          useClass: MockInteractWithServerService,
        },
        {
          provide: NgxSpinnerService,
          useClass: class {
            show = jasmine.createSpy('show');
            hide = jasmine.createSpy('hide');
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be refresh', () => {
    component.refreshPost();
  });
});
