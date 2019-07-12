import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UserBackendService} from '../../backend/user-backend.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {User} from '../../interface/User';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ UserManagementComponent ],
      providers: [
        {
          provide: UserBackendService,
          useClass: class {
            createUser = jasmine.createSpy('createUser');
            getUsers = jasmine.createSpy('getUsers').and.returnValue(of([]));
            updateUser = jasmine.createSpy('updateUser');
            deleteUser = jasmine.createSpy('deleteUser');
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user', () => {
    component.updateUser();
  });

  it('should delete user', () => {
    component.deleteUser();
  });

  it('should select user', () => {

    const user = {} as User;
    user.username = 'dummy_user';
    user.firstname = 'dummy_first';
    user.lastname = 'dummy_last';
    user.password = 'dummy_pwd';

    component.selectedItem(user);

    expect(component.form.get('firstname').value).toEqual(user.firstname);
    expect(component.form.get('username').value).toEqual(user.username);
    expect(component.form.get('lastname').value).toEqual(user.lastname);
    expect(component.form.get('password').value).toEqual(user.password);
  });

});
