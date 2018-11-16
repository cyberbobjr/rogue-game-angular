import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {MapEngine} from './map-engine.service';
import {EntitiesService} from './entities.service';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import {Position} from '../classes/position';
import {Utility} from '../classes/utility';

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
  viewport: string[][];

  get display(): Display {
    return this._display;
  }

  get scheduler(): Scheduler {
    return this._scheduler;
  }

  constructor(private mapEngine: MapEngine,
              private entitiesService: EntitiesService) {
    this._display = new Display();
    this.viewport = Utility.initArray(this.maxVisiblesCols, this.maxVisiblesRows);
  }

  drawMap() {
    for (let j = 0; j < this.viewport.length; j++) {
      for (let i = 0; i < this.viewport[0].length; i++) {
        this.display.draw(i, j, this.viewport[j][i], 'gray', null);
      }
    }
  }

  drawEntities() {
    for (const actor of this.entitiesService.entities) {
      const newTranslatedPosition = this._translatePosition(actor.position);
      this.display.draw(newTranslatedPosition.x, newTranslatedPosition.y, actor.character, 'white', null);
    }
  }

  setCameraPosition(cameraPosition: Position) {
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
    const currentMap: string[][] = this.mapEngine.map;
    this.cameraEndPosition.col = this.cameraStartPosition.col + this.maxVisiblesCols;
    this.cameraEndPosition.row = this.cameraStartPosition.row + this.maxVisiblesRows;

    if (this.cameraEndPosition.col > currentMap[0].length) {
      this.cameraEndPosition.col = currentMap[0].length;
      this.cameraStartPosition.col = this.cameraEndPosition.col - this.maxVisiblesCols;
    }
    if (this.cameraEndPosition.row > currentMap.length) {
      this.cameraEndPosition.row = currentMap.length;
      this.cameraStartPosition.row = this.cameraEndPosition.row - this.maxVisiblesRows;
    }
    let y = 0;
    let x = 0;
    try {
      for (let j = this.cameraStartPosition.row; j < this.cameraEndPosition.row; j++) {
        for (let i = this.cameraStartPosition.col; i < this.cameraEndPosition.col; i++) {
          this.viewport[y][x] = currentMap[j][i];
          x++;
        }
        y++;
        x = 0;
      }
    } catch (e) {
      console.log(this);
    }
  }

  private _translatePosition(position: Position): Position {
    return new Position(position.x - this.cameraStartPosition.col, position.y - this.cameraStartPosition.row);
  }
}
