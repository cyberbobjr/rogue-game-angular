import {Component, OnInit} from '@angular/core';
import {EventLog} from '../../classes/event-log';

@Component({
             selector: 'app-info-page',
             templateUrl: './info-page.component.html',
             styleUrls: ['./info-page.component.css']
           })
export class InfoPageComponent implements OnInit {
  message: string = null;

  constructor() {
  }

  ngOnInit() {
    EventLog.getInstance()
            .message$
            .subscribe((message: string) => {
              this.message = message;
            });
  }

}
