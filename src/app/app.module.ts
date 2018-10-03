/**
 * Author: Sabitha Sharma
 * @file - App Component
 * @description - Main Module for loading oher modules and components
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';



// importing components
import { AppComponent } from './app.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { CommentsComponent } from './components/comments/comments.component';
import { TreeComponent } from './components/tree/tree.component';
import { CommentDetailsComponent } from './components/comments/comment-details/comment-details.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedsComponent,
    CommentsComponent,
    TreeComponent,
    CommentDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    SidebarModule,
    CardModule,
    PaginatorModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
