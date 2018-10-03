/**
 * Author: Sabitha Sharma
 * @file - Tree Component
 * @description - Forms a tree like structure for all the plies in the comment
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: [ './tree.component.css' ]
})
export class TreeComponent {
  @Input() parentId: number;
  @Input() dataList: any [];

  removeCurrentLevelItems = (datalist: any, parentId: string) => {
    // logic here to remove current level items
    return datalist.filter(item => item.parentId !== parentId);
    // return datalist;
  }
  /**
   * return the Unix timestamp into readable format
   * @method getDateTime
   */
  getDateTime(created_utc: number) {
    return new Date(created_utc * 1000);
  }
}
