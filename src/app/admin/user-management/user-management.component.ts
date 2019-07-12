import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interface/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserBackendService} from '../../backend/user-backend.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ResponseCustomPost} from '../../interface/response-custom-post';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  form: FormGroup;
  public users: User[];
  private usersObservable: Subscription;
  public error: any;
  public selectedUser: User = undefined;

  constructor(private backendClient: UserBackendService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]]
    });

    this.usersObservable = this.subscribeToGetUsers();
  }

  ngOnDestroy() {
    if (this.usersObservable) {
      this.usersObservable.unsubscribe();
    }
  }

  createUser() {
    const user = this.convertToUserFromForm();

    this.backendClient.createUser(user).subscribe(
      data => {
        const resp = data as ResponseCustomPost;
        this.handleResponse(resp, 'Created');
      }
    );
  }

  private convertToUserFromForm() {
    const user = {} as User;
    user.firstname = this.form.get('firstname').value;
    user.lastname = this.form.get('lastname').value;
    user.username = this.form.get('username').value;
    user.password = this.form.get('password').value;
    return user;
  }

  private subscribeToGetUsers() {
    return this.backendClient.getUsers().subscribe(
      (result: User[]) => {
        this.users = result;
        this.error = undefined;
      },
      err => {
        this.error = err;
      }
    );
  }

  selectedItem(user: User) {
    this.selectedUser = user;
    this.form.controls['firstname'].setValue(user.firstname);
    this.form.controls['lastname'].setValue(user.lastname);
    this.form.controls['username'].setValue(user.username);
    this.form.controls['password'].setValue(user.password);
  }

  updateUser() {
    const user = this.convertToUserFromForm();

    this.backendClient.updateUser(user).subscribe(
      data => {
        const resp = data as ResponseCustomPost;
        this.handleResponse(resp, 'Updated');
      }
    );
  }

  deleteUser() {
    const user = this.convertToUserFromForm();

    this.backendClient.deleteUser(user).subscribe(
      data => {
        const resp = data as ResponseCustomPost;
        this.handleResponse(resp, 'Deleted');
      }
    );
  }

  private handleResponse(resp, title) {
    if (resp.status === 200) {
      this.toastr.success(resp.msg, title);
      this.refresh();
      this.resetUser();
    } else {
      this.toastr.error(resp.msg, 'Error');
    }
  }

  private refresh() {
    this.backendClient.getUsers().subscribe(
      (result: User[]) => {
        this.users = result;
        this.error = undefined;
      },
      err => {
        this.error = err;
      }
    );
  }

  private resetUser() {
    this.selectedUser = undefined;
    this.form.controls['firstname'].setValue('');
    this.form.controls['lastname'].setValue('');
    this.form.controls['username'].setValue('');
    this.form.controls['password'].setValue('');
  }
}
