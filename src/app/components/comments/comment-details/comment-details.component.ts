import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent {
  @Input() comment: any;
  constructor() { }

  /**
   * @method getDateTime
   * @description returns date and time in readbale format
   */
  getDateTime(created_utc) {
    return new Date(created_utc * 1000);
   // return moment.unix(created_utc).format('L'); // used if formatting is required
  }

}
