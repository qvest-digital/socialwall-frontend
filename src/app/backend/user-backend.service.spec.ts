import {getTestBed, TestBed} from '@angular/core/testing';

import { UserBackendService } from './user-backend.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {URL_USERS} from '../app.constants';
import {User} from '../interface/User';


describe('UserBackendService', () => {

  let injector: TestBed;
  let service: UserBackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserBackendService
      ]
    });

    injector = getTestBed();
    service = injector.get(UserBackendService);
    httpMock = injector.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return user', () => {
    const usersDummy = {} as User[];
    service.getUsers().subscribe(users => {
      expect(users).toEqual(usersDummy);
    });

    const req = httpMock.expectOne(`${URL_USERS}`);
    expect(req.request.method).toBe('GET');
    req.flush(usersDummy);
  });

  it('should create post', () => {
    const userDummy = {} as User;
    service.createUser(userDummy);

    const req = httpMock.expectOne(`${URL_USERS}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(userDummy);
  });

  it('should update post', () => {
    const userDummy = {} as User;
    service.updateUser(userDummy);

    const req = httpMock.expectOne(`${URL_USERS}/update`);
    expect(req.request.method).toBe('POST');
    req.flush(userDummy);
  });

  it('should delete post', () => {
    const userDummy = {} as User;
    userDummy.username = 'dummy';
    service.deleteUser(userDummy);

    const req = httpMock.expectOne(`${URL_USERS}/delete/dummy`);
    expect(req.request.method).toBe('DELETE');
    req.flush(userDummy);
  });

});
