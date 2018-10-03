/**
 * Author: Sabitha Sharma
 * @file - Comment Service
 * @description - Reads the comments from reddit url
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http: Http) { }

  /**
   * @method- getComments
   * @description - reads and return the comment to UI
   */
  getComments = (url: string): any => {
    return this._http.get(url).pipe(
      map((response: Response) => response.json())
    );
  }
}
