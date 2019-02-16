import {Injectable} from '@angular/core';
import {Position} from '../../../core/classes/base/position';
import {GameMap} from '../../../core/classes/base/game-map';
import {Sprite} from '../../../core/classes/base/sprite';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {Display} from 'rot-js/lib';
import {EntitiesService} from './entities.service';
import {Player} from '../../../core/classes/entities/player';
import * as Color from 'color';

@Injectable({
  providedIn: 'root'
})
export class DisplayEngine {
  private _display: Display = new Display();
  maxVisiblesCols = 20;
  maxVisiblesRows = 20;

  get display(): Display {
    return this._display;
  }

  set options(options: Partial<DisplayOptions>) {
    this.display.setOptions(options);
    this.display.clear();
  }

  get container(): HTMLElement | null {
    return this.display.getContainer();
  }

  constructor() {
  }

  public computeVisiblesRowsCols() {
    const [width, height] = (this.display.computeSize(this.container.offsetWidth, this.container.offsetHeight));
    this.maxVisiblesCols = width;
    this.maxVisiblesRows = height;
  }

  public draw(gameMap: GameMap, cameraPosition: Position) {
    const cameraStartPosition: Position = this._getStartViewPortOfPosition(cameraPosition);
    const viewport: GameMap = gameMap.extract(cameraStartPosition.x, cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
    this._display.clear();
    this._drawViewPort(viewport);
  }

  private _getStartViewPortOfPosition(cameraPosition: Position) {
    const x = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
    const y = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
    return new Position(x, y);
  }

  private _drawViewPort(viewport: GameMap) {
    try {
      for (let j = 0; j < viewport.height; j++) {
        for (let i = 0; i < viewport.width; i++) {
          const sprite: Sprite = <Sprite>viewport.getDataAt(i, j).sprite;
          const fovValue: number = viewport.fovMap[j][i];
          if (sprite && fovValue !== 0) {
            this.display.draw(i, j, sprite.character, this._darkenColor(sprite.color, fovValue), this._darkenColor(sprite.bgColor, fovValue));
          }
        }
      }
    } catch (e) {
      console.log(e);
      console.trace();
    }
  }

  private _darkenColor(color: string, fovValue: number): string {
    return Color(color)
      .darken(fovValue)
      .hex();
  }
}
