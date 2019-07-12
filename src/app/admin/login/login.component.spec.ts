import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../backend/authentication-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthenticationService,
          useClass: class {
            login = jasmine.createSpy('login');
            logout = jasmine.createSpy('logout');
          }
        },
        {
          provide: Router,

        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 3}),
            snapshot: {
              queryParams: {
                returnUrl: '/'
              }
            }
          }
        },
        FormBuilder

      ],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
