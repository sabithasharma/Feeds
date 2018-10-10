/**
 * Author: Sabitha Sharma
 * @file - Feeds Component
 * @description - reads and displays the feed from reddit
 */
import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../../services/feeds.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
  providers: [FeedsService]
})
export class FeedsComponent implements OnInit {
  ROW_LIMIT = 10;
  ifeeds: any;
  selectedFeed;
  lastFeedId;
  firstFeedId;
  selectedNumber = { name: this.ROW_LIMIT };
  MAX_DATA = 25;
  constructor(private _ifeed: FeedsService) {
  }

  /**
   * @method ngOnInit
   * @description initializes component
   */
  ngOnInit() {
    this._ifeed.getAllFeed()
      .subscribe(feeds => {
        this.updateFeedsData(feeds);
      });
  }

  /**
   * @method loadPrev
   * @description load previous items
   */
  public loadPrev = (): void => {
    this._ifeed.getPrevFeeds(this.MAX_DATA, this.firstFeedId)
      .subscribe(feeds => {
        if (feeds.data.dist === 0 && feeds.data.children.length === 0) {
          this.clearFeedsData();
          return;
        }
        this.updateFeedsData(feeds);
      });
  }

  /**
   * @method loadPrev
   * @description load next items
   */
  public loadNext = (): void => {
    this._ifeed.getNextFeeds(this.MAX_DATA, this.lastFeedId)
      .subscribe(feeds => {
        this.updateFeedsData(feeds);
      });
  }

  /**
   * @method updateFeedsData
   * @description updates the feed list
   */
  private updateFeedsData = (feeds: any): void => {
    if (feeds.data.children.length > this.MAX_DATA) {
      this.ifeeds = feeds.data.children.slice(0, this.MAX_DATA);
    } else {
      this.ifeeds = feeds.data.children;
    }
    this.lastFeedId = this.ifeeds[this.ifeeds.length - 1].data.name;
    this.firstFeedId = this.ifeeds[0].data.name;
  }

  /**
   * @method clearFeedsData
   * @description clears the feed list
   */
  private clearFeedsData = (): void => {
    this.ifeeds = [];
    this.lastFeedId = '';
  }
  /**
   * @method updateSelectedFeed
   * @description updates the selection of the feed
   */
  private updateSelectedFeed = (feed: any): void => {
    this.selectedFeed = feed;
  }

  /**
   * @method getDateTime
   * @description return date in readable format
   */
  private getDateTime = (created_utc: number): Date => {
    return new Date(created_utc * 1000);
    // return moment.unix(created_utc).format('L'); // used if formatting is required
  }

}
