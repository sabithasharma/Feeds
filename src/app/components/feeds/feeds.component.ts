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

  ifeeds: any;
  sortOptions;
  selectedFeed;
  displayDialog: boolean;
  lastFeedId;
  firstFeedId;
  currentPage = 0;
  ifeedsFull;
  selectedNumber = { name: '5' };
  pageNumbers = [
    { name: '5' },
    { name: '10' },
    { name: '25' }
  ];
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
   * @method onRowUpdate
   * @description triggered when no of rows in a page changes
   */
  private onRowUpdate = (event: any): void => {
    console.log(event.value);
    this.firstFeedId = this.ifeeds[0].data.id;
    this._ifeed.getNextFeeds(this.selectedNumber.name, this.firstFeedId)
        .subscribe(feeds => {
          this.updateFeedsData(feeds);
    });
  }

  /**
   * @method loadPrev
   * @description load previous items
   */
  private loadPrev = (): void => {
    this._ifeed.getPrevFeeds(this.selectedNumber.name, this.firstFeedId)
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
  private loadNext = (): void => {
    this._ifeed.getNextFeeds(this.selectedNumber.name, this.lastFeedId)
      .subscribe(feeds => {
        this.updateFeedsData(feeds);
      });
  }

  /**
   * @method updateFeedsData
   * @description updates the feed list
   */
  private updateFeedsData = (feeds: any): void => {
    if (feeds.data.children.length > this.selectedNumber.name) {
      this.ifeeds = feeds.data.children.splice(0, this.selectedNumber.name);
    } else {
      this.ifeeds = feeds.data.children;
    }
    this.lastFeedId = feeds.data.children[feeds.data.children.length - 1].data.name;
    this.firstFeedId = feeds.data.children[0].data.name;
  }

  /**
   * @method clearFeedsData
   * @description clears the feed list
   */
  private clearFeedsData = (): void => {
    this.ifeeds = [];
    // this.firstFeedId = '';
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
