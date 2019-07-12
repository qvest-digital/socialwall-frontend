import {Input} from '@angular/core';
import {SocialPost} from '../../interface/social-post';

export abstract class AbstractEvent {
 @Input() socialPost: SocialPost;
}
