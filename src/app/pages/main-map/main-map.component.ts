import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {RotDisplayService} from '../../services/rot-display.service';
import {EntitiesService} from '../../services/entities.service';
import {IEntity} from '../../interfaces/ientity';

@Component({
             selector: 'app-main-map',
             templateUrl: './main-map.component.html',
             styleUrls: ['./main-map.component.css']
           })
export class MainMapComponent implements OnInit {
  @ViewChild('refMap') refMap: ElementRef;
  @Input('map') map: Array<string> = [];
  display: Display;

  constructor(private displayService: RotDisplayService) {
    this.display = displayService.display;
  }

  ngOnInit() {
    this.refMap.nativeElement.appendChild(this.display.getContainer());
    this.displayService.draw();
    this.mainLoop();
  }

  async mainLoop() {
    setTimeout(() => {
      this.displayService.drawEntities();
    }, 1000);
  }
}
