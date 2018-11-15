import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {RotMapEngine} from './rot-map-engine.service';
import {EntitiesService} from './entities.service';
import Scheduler from 'rot-js/lib/scheduler/scheduler';

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

  constructor(private rotmapService: RotMapEngine,
              private entitiesService: EntitiesService) {
    this._display = new Display();
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
