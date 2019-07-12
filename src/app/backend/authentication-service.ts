import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {URL_LOGIN} from '../app.constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements CanActivate {
  constructor(private http: HttpClient, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  login(username: string, password: string) {
    return this.http.post<any>(URL_LOGIN, { username, password })
      .pipe(map(token => {
        // login successful if there's a user in the response
        if (token) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          console.log(token['access_token']);
          localStorage.setItem('access_token', token['access_token']);
        }

        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
