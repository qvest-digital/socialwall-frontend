import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BackendClientService} from '../../backend/backend-client.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {SocialPost} from '../../interface/social-post';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      providers: [
        {
          provide: BackendClientService,
          useClass: class {
            getCustomPosts = jasmine.createSpy('getCustomPosts').and.returnValue(of([]));
            createPost = jasmine.createSpy('createPost');
            updatePost = jasmine.createSpy('updatePost');
            deletePost = jasmine.createSpy('deletePost');
          }
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    const socialPost = {} as SocialPost;
    socialPost.title = 'dummy titel';
    socialPost.externalId = 'hello';


    expect(component).toBeTruthy();
  });

  it('should createPost', () => {
    component.createPost();
  });


  it('should updatePost', () => {
    component.selectedPost = {} as SocialPost;
    component.selectedPost.externalId = 'dummy id';
    component.updatePost();
  });

  it('should delete user', () => {
    component.selectedPost = {} as SocialPost;
    component.selectedPost.externalId = 'dummy id';
    component.deletePost();
  });

  it('should select user', () => {

    const socialPost = {} as SocialPost;
    socialPost.title = 'dummy titel';
    socialPost.externalId = 'hello';

    component.selectedItem(socialPost);

    expect(component.title).toEqual(socialPost.title);
  });
});
