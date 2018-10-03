/**
 * Author: Sabitha Sharma
 * @file - Comments Component
 */
import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from './../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentsService]
})
export class CommentsComponent implements OnInit {
  @Input() commentsLink: string;
  @Input() selectedFeed: any;
  comments;
  loadingComments;
  noComments;
  redditUrl = 'https://www.reddit.com';
  allowSelfEdit = false;
  constructor(private _commentsService: CommentsService) { }

  ngOnInit() {
    if (this.commentsLink) {
      const url: string = this.redditUrl + this.commentsLink + '.json';
      this.loadingComments = true;
      this._commentsService.getComments(url)
        .subscribe(comments => {
          this.comments = comments[1].data.children;
          this.hideLoading();
        });
    }
  }

  private hideLoading = () => {
    this.loadingComments = false;
    this.noComments = false;
  }

  private allowEditing = (): void => {
    this.allowSelfEdit = true;
  }

  private disableEditing = (): void => {
    this.allowSelfEdit = false;
  }
}
