import {Component, OnInit} from '@angular/core';
import {EventLog} from '../../../../core/classes/event-log';

@Component({
             selector: 'app-log-page',
             templateUrl: './log-page.component.html',
             styleUrls: ['./log-page.component.css']
           })
export class LogPageComponent implements OnInit {
  messages: Array<string> = [];

  constructor() {
    EventLog.getInstance()
            .message$
            .subscribe((message: string) => {
              this.messages.push(message);
              if (this.messages.length > 5) {
                this.messages.splice(0, 1);
              }
            });
  }

  ngOnInit() {
  }

}
