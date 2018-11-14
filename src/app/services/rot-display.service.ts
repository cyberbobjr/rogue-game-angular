import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {RotMapService} from './rot-map.service';
import {EntitiesService} from './entities.service';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import Engine from 'rot-js/lib/engine';
import Simple from 'rot-js/lib/scheduler/simple';

@Injectable({
              providedIn: 'root'
            })
export class RotDisplayService {
  private _display: Display;
  private _scheduler: Scheduler = null;

  get display(): Display {
    return this._display;
  }

  get scheduler(): Scheduler {
    return this._scheduler;
  }

  constructor(private rotmapService: RotMapService,
              private entitiesService: EntitiesService) {
    this._display = new Display();
  }

  draw() {
    this.drawMap();
  }

  drawMap() {
    for (let i = 0; i < this.rotmapService.width; i++) {
      for (let j = 0; j < this.rotmapService.height; j++) {
        this.display.draw(i, j, this.rotmapService.map[j][i], 'gray', null);
      }
    }
  }

  drawEntities() {
    for (const actor of this.entitiesService.entities) {
      this.display.draw(actor.position.x, actor.position.y, actor.character, 'white', null);
    }
  }
}
