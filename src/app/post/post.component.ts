import {Component, HostListener, OnInit} from '@angular/core';
import {BackendClientService} from '../backend/backend-client.service';
import {SocialPost} from '../interface/social-post';
import {NgxSpinnerService} from 'ngx-spinner';
import {interval} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  text: string;
  start: string;
  end: string;
  public image: string;
  socialPost: SocialPost = undefined;
  googlePosts: SocialPost[] = [];
  selectComponent: number;

  constructor(private backendClient: BackendClientService,
              private spinner: NgxSpinnerService) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   console.log(event.key);

   if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
     this.getAPostFromBackend();
   }
  }

  ngOnInit() {
    this.spinner.show();

    this.getAPostFromBackend();

    this.refreshPost();
  }

  refreshPost() {
    interval(1000 * 10).subscribe(x => {

      this.getAPostFromBackend();
    });
  }

  private getAPostFromBackend() {
    this.backendClient.getNewPost().subscribe(socialPost => {
      this.socialPost = socialPost;
      this.selectComponent = this.googlePosts.findIndex(googlePost => googlePost.externalId === socialPost.externalId);

      this.backendClient.getGooglePosts().subscribe(data => {

        this.googlePosts = data;
        this.spinner.hide();
      });
    });
  }
}
