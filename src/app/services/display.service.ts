import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {MapEngine} from './map-engine.service';
import {EntitiesService} from './entities.service';
import {Position} from '../classes/position';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {GameMap} from '../classes/gameMap';

@Injectable({
              providedIn: 'root'
            })
export class DisplayService {
  private _fontSize = 16;
  private _display: Display = new Display();

  maxVisiblesCols = 20;
  maxVisiblesRows = 20;
  cameraStartPosition: { col: number, row: number } = {col: 0, row: 0};

  get display(): Display {
    return this._display;
  }

  set options(options: Partial<DisplayOptions>) {
    this._fontSize = this._fontSize || options.fontSize;
    this.display.setOptions(options);
  }

  get container(): HTMLElement | null {
    return this.display.getContainer();
  }

  constructor(private mapEngine: MapEngine,
              private entitiesService: EntitiesService) {
  }

  computeBounds() {
    const [width, height] = (this.display.computeSize(this.container.offsetWidth, this.container.offsetHeight));
    this.maxVisiblesCols = width;
    this.maxVisiblesRows = height - 1;
  }

  draw() {
    const gameMap = Object.assign(this.mapEngine.map);
    const viewport: GameMap = this._computeViewport(gameMap);
    this._putEntities(viewport);
    this._drawViewPort(viewport);
  }

  private _drawViewPort(viewport: GameMap) {
    for (let j = 0; j < viewport.content.length; j++) {
      for (let i = 0; i < viewport.content[0].length; i++) {
        this.display.draw(i, j, viewport.content[j][i], 'gray', null);
      }
    }
  }

  private _putEntities(gameMap: GameMap) {
    for (const actor of this.entitiesService.entities) {
      gameMap.content[actor.position.y][actor.position.x] = actor.character;
    }
  }

  centerCameraOnPosition(cameraPosition: Position) {
    this.cameraStartPosition.col = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
    this.cameraStartPosition.row = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
  }

  private _computeViewport(currentMap: GameMap): GameMap {
    return currentMap.extract(this.cameraStartPosition.col, this.cameraStartPosition.row, this.maxVisiblesCols, this.maxVisiblesRows);
  }
}
