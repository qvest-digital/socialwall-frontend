import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SocialPost} from '../interface/social-post';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {URL_CUSTOM_POST, URL_SOCIAL_POST} from '../app.constants';
import {ResponseCustomPost} from '../interface/response-custom-post';

@Injectable({
  providedIn: 'root'
})
export class BackendClientService {

  private backendUrl = URL_SOCIAL_POST;
  private backendCustomPosts = URL_CUSTOM_POST;

  // private backendUrl = 'http://0.0.0.0:12300/socialposts';
  // private backendCustomPosts = 'http://0.0.0.0:12300/customposts';

  constructor(private httpClient: HttpClient) {
  }

  getNewPost(): Observable<SocialPost> {
    return this.httpClient.get<SocialPost>(this.backendUrl)
      .pipe(
        retry(3)
      );
  }

  getCustomPosts(): Observable<SocialPost[]> {
    return this.httpClient.get<SocialPost[]>(this.backendCustomPosts)
      .pipe(
        retry(3),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }


  getGooglePosts(): Observable<SocialPost[]> {
    return this.httpClient.get<SocialPost[]>(this.backendUrl + '/google')
      .pipe(
        retry(3),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }

  public createPost(socialPost: SocialPost): Observable<ResponseCustomPost> {
    return this.httpClient.post(this.backendCustomPosts + '/create',  JSON.stringify(socialPost))
      .pipe(
        map( data => {
          return data as ResponseCustomPost;
        }),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
    );
  }

  public updatePost(socialPost: SocialPost): Observable<ResponseCustomPost> {
    return  this.httpClient.post(this.backendCustomPosts + '/update',  JSON.stringify(socialPost))
      .pipe(
        map(data =>  {
          return data as ResponseCustomPost;
        }),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }

  public deletePost(socialPost: SocialPost): Observable<ResponseCustomPost> {
    return this.httpClient.delete(this.backendCustomPosts + '/delete/' + socialPost.externalId)
      .pipe(
        map(data =>  {
          return data as ResponseCustomPost;
        }),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }


}

