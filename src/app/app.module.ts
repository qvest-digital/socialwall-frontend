import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PostComponent} from './post/post.component';
import {UploadComponent} from './admin/upload/upload.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularEditorModule} from '@sedlan/angular-edit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { LoginComponent } from './admin/login/login.component';
import {AuthGuard} from './authgard/auth.guard';
import { GoogleCalendarComponent } from './post/google-calendar/google-calendar.component';
import { GoogleCalendarEventComponent } from './post/event/google-calendar-event/google-calendar-event.component';
import { WordpressEventComponent } from './post/event/wordpress-event/wordpress-event.component';
import { CustomPostEventComponent } from './post/event/custom-post-event/custom-post-event.component';
import { InstagramEventComponent } from './post/event/instagram-event/instagram-event.component';
import { TwitterEventComponent } from './post/event/twitter-event/twitter-event.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {registerLocaleData} from '@angular/common';
import localeDE from '@angular/common/locales/de';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminUiComponent } from './admin/admin-ui.component';
import {ToastrModule} from 'ngx-toastr';


const appRoutes: Routes = [
  { path: 'backend', component: AdminUiComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: PostComponent}
];

registerLocaleData(localeDE, 'de');

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    UploadComponent,
    LoginComponent,
    GoogleCalendarComponent,
    GoogleCalendarEventComponent,
    WordpressEventComponent,
    CustomPostEventComponent,
    InstagramEventComponent,
    TwitterEventComponent,
    UserManagementComponent,
    AdminUiComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [ AuthGuard,
              {provide: LOCALE_ID, useValue: 'de'},
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
