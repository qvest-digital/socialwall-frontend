import {getTestBed, TestBed} from '@angular/core/testing';

import {BackendClientService} from './backend-client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SocialPost} from '../interface/social-post';
import {URL_CUSTOM_POST, URL_SOCIAL_POST} from '../app.constants';

describe('BackendClientService', () => {

  let injector: TestBed;
  let service: BackendClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BackendClientService
      ]
    });

    injector = getTestBed();
    service = injector.get(BackendClientService);
    httpMock = injector.get(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return socialPost', () => {
    const socialPostDummy = {} as SocialPost;
    service.getNewPost().subscribe(socialPost => {
      expect(socialPost).toEqual(socialPostDummy);
    });

    const req = httpMock.expectOne(`${URL_SOCIAL_POST}`);
    expect(req.request.method).toBe('GET');
    req.flush(socialPostDummy);
  });

  it('should return dummy custompost list', () => {
    const socialPostDummy = {} as SocialPost[];
    service.getCustomPosts().subscribe(socialPost => {
      expect(socialPost).toEqual(socialPostDummy);
    });

    const req = httpMock.expectOne(`${URL_CUSTOM_POST}`);
    expect(req.request.method).toBe('GET');
    req.flush(socialPostDummy);
  });

  it('should return dummy googlepost list', () => {
    const socialPostDummy = {} as SocialPost[];
    service.getGooglePosts().subscribe(socialPost => {
      expect(socialPost).toEqual(socialPostDummy);
    });

    const req = httpMock.expectOne(`${URL_SOCIAL_POST}/google`);
    expect(req.request.method).toBe('GET');
    req.flush(socialPostDummy);
  });

  it('should create post', () => {
    const socialPostDummy = {} as SocialPost;
    service.createPost(socialPostDummy);

    const req = httpMock.expectOne(`${URL_CUSTOM_POST}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(socialPostDummy);
  });

  it('should update post', () => {
    const socialPostDummy = {} as SocialPost;
    service.updatePost(socialPostDummy);

    const req = httpMock.expectOne(`${URL_CUSTOM_POST}/update`);
    expect(req.request.method).toBe('POST');
    req.flush(socialPostDummy);
  });

  it('should delete post', () => {
    const socialPostDummy = {} as SocialPost;
    socialPostDummy.externalId = 'dummy';
    service.deletePost(socialPostDummy);

    const req = httpMock.expectOne(`${URL_CUSTOM_POST}/delete/dummy`);
    expect(req.request.method).toBe('DELETE');
    req.flush(socialPostDummy);
  });

});
