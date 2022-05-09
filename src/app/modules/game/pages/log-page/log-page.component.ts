import {Component, OnInit} from '@angular/core';
import {EventLog} from '../../../../game/core/Utility/event-log';

@Component({
             selector: 'app-log-page',
             templateUrl: './log-page.component.html',
             styleUrls: ['./log-page.component.scss']
           })
export class LogPageComponent implements OnInit {
  messages: Array<string> = [];

  constructor() {
    EventLog.getInstance()
            .message$
            .subscribe((message: string) => {
              if (this.messages.length > 4) {
                this.messages.splice(0, 1);
              }
              this.messages.push(message);
            });
  }

  ngOnInit() {
  }

}
