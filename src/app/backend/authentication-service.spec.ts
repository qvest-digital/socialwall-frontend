import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from './authentication-service';
import {Router} from '@angular/router';
import {URL_LOGIN} from '../app.constants';


describe('AuthenticationService', () => {

  let injector: TestBed;
  let service: AuthenticationService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
      ]
    });

    injector = getTestBed();
    service = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(AuthenticationService).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login', () => {
    const tokenDummy = 'dummy-token';
    service.login('dummy', 'dummy').subscribe(token => {
      expect(token).toEqual(tokenDummy);
    });

    const req = httpMock.expectOne(`${URL_LOGIN}`);
    expect(req.request.method).toBe('POST');
    req.flush(tokenDummy);
  });

  it('should logout', () => {
    service.logout();
 });

});
