import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUiComponent } from './admin-ui.component';
import {AuthenticationService} from '../backend/authentication-service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminUiComponent', () => {
  let component: AdminUiComponent;
  let fixture: ComponentFixture<AdminUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUiComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useClass: class {
            logout = jasmine.createSpy('logout');
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();
  });

  it('should showPostManagement is true', () => {
    component.showPostManagement = false;
    component.showPostManagementForm();
    expect(component.showPostManagement).toBe(true);
  });

  it('should showPostManagement is false', () => {
    component.showPostManagement = true;
    component.showUserManagementForm();
    expect(component.showPostManagement).toBe(false);
  });
});
