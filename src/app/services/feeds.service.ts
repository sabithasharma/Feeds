/**
 * Author: Sabitha Sharma
 * @file - FeedsService
 * @description - reads the feed from reddit
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private _feedurl = 'https://www.reddit.com/r/sweden.json';
  constructor(private _http: Http) {

  }
  /**
   * @method - getFeeds
   * @description - gets the feed from url
   */
  getNextFeeds(rows, id): any {
    const url = this._feedurl + '?limit=' + rows + '&after=' + id;
    return this._http.get(url).pipe(
      map((response: Response) => response.json()),
    );
  }

  getPrevFeeds(rows, id): any {
    const url = this._feedurl + '?limit=' + rows + '&before=' + id;
    return this._http.get(url).pipe(
      map((response: Response) => response.json()),
    );
  }
  /**
   * @method - getAllFeed
   * @description - gets the feed from url
   */
  getAllFeed(): any {
    return this._http.get(this._feedurl).pipe(
      map((response: Response) => response.json()),
    );
  }

}
