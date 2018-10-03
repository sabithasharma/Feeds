/**
 * Author: Sabitha Sharma
 * @file - Feeds Component
 * @description - reads and displays the feed from reddit
 */
import { Component, OnInit } from '@angular/core';
import { IFeed } from '../../services/feed';
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
  selectedNumber = { name: '10' };
  pageNumbers = [
    { name: '5' },
    { name: '10' },
    { name: '25' }
  ];
  constructor(private _ifeed: FeedsService) {
  }
  ngOnInit() {
    /* this._ifeed.getAllFeed()
       .subscribe(feeds => {
         this.ifeedsFull = feeds.data.children;
         // this.ifeeds = feeds.data.children; to get all the feeds
       });*/
    this._ifeed.getAllFeed()
      .subscribe(feeds => {
        this.updateFeedsData(feeds);
      });
  }

  onRowUpdate(event: any) {
    console.log(event.value);
    /*if (this.selectedNumber.name > this.ifeeds.length) {
      this.firstFeedId = this.ifeeds[0].data.name;
      this.lastFeedId = '';
    } else if (this.selectedNumber.name < this.ifeeds.length) {
      this.firstFeedId = this.ifeeds[0].data.name;
    }*/
    this.firstFeedId = this.ifeeds[0].data.id;
    this._ifeed.getNextFeeds(this.selectedNumber.name, this.firstFeedId)
        .subscribe(feeds => {
          this.updateFeedsData(feeds);
    });
  }

  loadPrev() {
    this._ifeed.getPrevFeeds(this.selectedNumber.name, this.firstFeedId)
      .subscribe(feeds => {
        if (feeds.data.dist === 0 && feeds.data.children.length === 0) {
          this.clearFeedsData();
          return;
        }
        this.updateFeedsData(feeds);
      });
  }

  loadNext() {
    this._ifeed.getNextFeeds(this.selectedNumber.name, this.lastFeedId)
      .subscribe(feeds => {
        this.updateFeedsData(feeds);
      });
  }

  updateFeedsData(feeds) {
    if (feeds.data.children.length > this.selectedNumber.name) {
      this.ifeeds = feeds.data.children.splice(0, this.selectedNumber.name);
    } else {
      this.ifeeds = feeds.data.children;
    }
    this.lastFeedId = feeds.data.children[feeds.data.children.length - 1].data.name;
    this.firstFeedId = feeds.data.children[0].data.name;
  }

  clearFeedsData() {
    this.ifeeds = [];
    // this.firstFeedId = '';
     this.lastFeedId = '';
  }
  /**
   * @method updateSelectedFeed
   * @description updates the selection of the feed
   */
  updateSelectedFeed(feed: any) {
    this.selectedFeed = feed;
  }

  /**
   * @method getDateTime
   * @description return date in readable format
   */
  getDateTime(created_utc) {
    return new Date(created_utc * 1000);
  }

}
