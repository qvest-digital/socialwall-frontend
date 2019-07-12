import { Injectable } from '@angular/core';
import {User} from '../interface/User';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {URL_USERS} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserBackendService {

  private backendUsers = URL_USERS;


  constructor(private httpClient: HttpClient) { }



  public getUsers(): Observable<User[]> {
    console.log('getUsers');
    return this.httpClient.get<User[]>(this.backendUsers)
      .pipe(
        retry(3)
      );
  }

  public createUser(user: User): Observable<any> {
    return this.httpClient.post(this.backendUsers + '/create',  JSON.stringify(user))
      .pipe(
        map(data => data),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }

  public updateUser(user: User): Observable<any> {
    return this.httpClient.post(this.backendUsers + '/update',  JSON.stringify(user))
      .pipe(
        map(data => data),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }

  public deleteUser(user: User): Observable<any> {
    return this.httpClient.delete(this.backendUsers + '/delete/' + user.username)
      .pipe(
        map(data => data),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }
}
