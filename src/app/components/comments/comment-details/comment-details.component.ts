import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {
  @Input() comment: string;
  constructor() { }

  ngOnInit() {
  }

  getDateTime(created_utc) {
    return new Date(created_utc * 1000);
  }

}
