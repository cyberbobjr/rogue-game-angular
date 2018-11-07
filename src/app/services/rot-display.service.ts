import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {RotMapService} from './rot-map.service';
import {EntitiesService} from './entities.service';

@Injectable({
              providedIn: 'root'
            })
export class RotDisplayService {
  private _display: Display;

  get display(): Display {
    return this._display;
  }

  constructor(private rotmapService: RotMapService,
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

  drawPlayer() {
    const player = this.entitiesService.player;
    this.display.draw(player.position.x, player.position.y, player.character, 'white', null);
  }
}
