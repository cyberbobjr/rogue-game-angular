import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {MapEngine} from './map-engine.service';
import {EntitiesService} from './entities.service';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import {Position} from '../classes/position';
import {Utility} from '../classes/utility';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {GameMap} from '../classes/gameMap';

@Injectable({
              providedIn: 'root'
            })
export class DisplayService {
  private _display: Display;
  private _scheduler: Scheduler = null;

  maxVisiblesCols = 20;
  maxVisiblesRows = 20;
  cameraStartPosition: { col: number, row: number } = {col: 0, row: 0};
  cameraEndPosition: { col: number, row: number } = {col: this.maxVisiblesCols, row: this.maxVisiblesRows};
  viewport: GameMap;

  get display(): Display {
    return this._display;
  }

  get scheduler(): Scheduler {
    return this._scheduler;
  }

  set options(options: Partial<DisplayOptions>) {
    this.display.setOptions(options);
  }

  get container(): HTMLElement | null {
    return this.display.getContainer();
  }

  constructor(private mapEngine: MapEngine,
              private entitiesService: EntitiesService) {
    this._display = new Display();
  }

  setMaxBound(width: number, height: number) {
    this.maxVisiblesCols = width;
    this.maxVisiblesRows = height;
  }

  drawMap() {
    for (let j = 0; j < this.viewport.content.length; j++) {
      for (let i = 0; i < this.viewport.content[0].length; i++) {
        this.display.draw(i, j, this.viewport.content[j][i], 'gray', null);
      }
    }
  }

  drawEntities() {
    for (const actor of this.entitiesService.entities) {
      const newTranslatedPosition = this._translatePosition(actor.position);
      this.display.draw(newTranslatedPosition.x, newTranslatedPosition.y, actor.character, 'white', null);
    }
  }

  centerCameraOnPosition(cameraPosition: Position) {
    this.cameraStartPosition.col = cameraPosition.x - (this.maxVisiblesCols / 2);
    this.cameraStartPosition.row = cameraPosition.y - (this.maxVisiblesRows / 2);
    if (this.cameraStartPosition.col < 0) {
      this.cameraStartPosition.col = 0;
    }
    if (this.cameraStartPosition.row < 0) {
      this.cameraStartPosition.row = 0;
    }
    this._computeViewport();
  }

  private _computeViewport() {
    const currentMap: GameMap = this.mapEngine.map;
    this.viewport = currentMap.extract(this.cameraStartPosition.col, this.cameraStartPosition.row, this.maxVisiblesCols, this.maxVisiblesRows);
  }

  private _translatePosition(position: Position): Position {
    return new Position(position.x - this.cameraStartPosition.col, position.y - this.cameraStartPosition.row);
  }
}
