import {Component, OnInit} from '@angular/core';
import {BackendClientService} from '../../backend/backend-client.service';
import {AngularEditorConfig} from '@sedlan/angular-edit';
import {SocialPost} from '../../interface/social-post';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ResponseCustomPost} from '../../interface/response-custom-post';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})


export class UploadComponent implements OnInit {

  public selectedFile: any;

  public htmlContent = '';
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    maxHeight: '30rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  public socialPosts: SocialPost[];

  public title: string;
  public startDate: Date;
  public endDate: Date;
  public customPostsObservable: Subscription;
  public selectedPost: SocialPost ;
  public error: any;
  private responseReturn: any;

  constructor(private backendClient: BackendClientService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.customPostsObservable = this.subscribeToGetPosts();
    this.htmlContent = '';
    this.selectedPost = undefined;
  }


  subscribeToGetPosts(): Subscription {
    return this.backendClient.getCustomPosts().subscribe(
      (result: SocialPost[]) => {
        this.socialPosts = result;
        this.error = undefined;

      },
      err => {
        this.error = err;
        this.router.navigate(['/login']);
      }
    );
  }

  onFileChanged($event) {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.selectedFile = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  createPost() {
    const socialPost = this.createSocialPost();
    this.backendClient.createPost(socialPost).subscribe(
      data => {
        const resp = data as ResponseCustomPost;
        this.handleResponse(resp, 'Created');
      }
    );
  }

  private handleResponse(resp, title) {
    if (resp.status === 200) {
      this.toastr.success(resp.msg, title);
      this.refresh();
      this.resetPost();
    } else {
      this.toastr.error(resp.msg, 'Error');
    }
  }

  private refresh() {
    this.backendClient.getCustomPosts().subscribe(
      (result: SocialPost[]) => {
        this.socialPosts = result;
        this.error = undefined;
      },
      err => {
        this.error = err;
        this.router.navigate(['/login']);
      }
    );
  }

  updatePost() {
    const socialPost = this.createSocialPost();
    socialPost.externalId = this.selectedPost.externalId;
    this.backendClient.updatePost(socialPost).subscribe(
      data => {
        const resp = data as ResponseCustomPost;
        this.handleResponse(resp, 'Updated');
      }
    );
  }

  deletePost() {
    const socialPost = this.createSocialPost();
    socialPost.externalId = this.selectedPost.externalId;
    this.backendClient.deletePost(socialPost).subscribe(
      data => {
        const resp = data as ResponseCustomPost;
        this.handleResponse(resp, 'Deleted');
      }
    );
  }

  selectedItem(item) {
    this.selectedPost = item as SocialPost;
    this.htmlContent = this.selectedPost.text;
    this.selectedFile = this.selectedPost.image;
    this.startDate = new Date(parseInt(this.selectedPost.start, 10) * 1000);
    this.endDate = new Date(parseInt(this.selectedPost.end, 10) * 1000);
    this.title = this.selectedPost.title;
  }

  private createSocialPost() {
    const socialPost = {} as SocialPost;
    socialPost.created = this.startDate.toISOString();
    socialPost.end = this.endDate.toISOString();
    socialPost.start = this.startDate.toISOString();
    socialPost.image = this.selectedFile;
    socialPost.text = this.htmlContent;
    socialPost.title = this.title;
    return socialPost;
  }

  resetPost() {
    this.selectedPost = undefined;
    this.htmlContent = '';
    this.selectedFile = undefined;
    this.title = '';

    this.startDate = new Date();
    this.endDate = new Date();
    this.htmlContent = '';
    this.selectedPost = undefined;

  }
}
