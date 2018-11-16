import {Component, OnInit} from '@angular/core';
import {LoggingService} from '../../services/logging.service';

@Component({
             selector: 'app-info-page',
             templateUrl: './info-page.component.html',
             styleUrls: ['./info-page.component.css']
           })
export class InfoPageComponent implements OnInit {
  info = '';

  constructor(private _loggingService: LoggingService) {
    this._loggingService.text.subscribe((text: string) => {
      this.info = text;
    });
  }

  ngOnInit() {
  }

}
