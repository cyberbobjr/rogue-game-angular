import {Injectable} from '@angular/core';
import {Position} from '../../../core/classes/base/position';
import {GameMap} from '../../../core/classes/base/gameMap';
import {Sprite} from '../../../core/classes/base/sprite';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {Display} from 'rot-js/lib';
import {EntitiesService} from './entities.service';
import {Player} from '../../../core/classes/entities/player';
import * as Color from 'color';

@Injectable({
              providedIn: 'root'
            })
export class DisplayService {
  private _fontSize = 16;
  private _display: Display = new Display();
  private _cameraPosition: Position;
  maxVisiblesCols = 20;
  maxVisiblesRows = 20;
  cameraStartPosition: Position;

  get cameraPosition(): Position {
    return this._cameraPosition;
  }

  set cameraPosition(value: Position) {
    this._cameraPosition = value;
    this.cameraStartPosition = this._getStartViewPortOfPosition(value);
  }

  get display(): Display {
    return this._display;
  }

  set options(options: Partial<DisplayOptions>) {
    this._fontSize = this._fontSize || options.fontSize;
    this.display.setOptions(options);
    this.display.clear();
  }

  get container(): HTMLElement | null {
    return this.display.getContainer();
  }

  constructor(private _entitiesService: EntitiesService) {
  }

  computeBounds() {
    const [width, height] = (this.display.computeSize(this.container.offsetWidth, this.container.offsetHeight));
    this.maxVisiblesCols = width;
    this.maxVisiblesRows = height;
  }

  draw(gameMap: GameMap) {
    const player: Player = this._entitiesService.player;
    const finalMap: GameMap = gameMap.clone()
                                     .putEntitiesOnMap(this._entitiesService.getAllEntities())
                                     .createFovCasting()
                                     .computeFOVMap(player.lightRadius, player.lightPower, this.cameraPosition)
                                     .extract(this.cameraStartPosition.x, this.cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
    this._drawViewPort(finalMap);
  }

  private _getStartViewPortOfPosition(cameraPosition: Position) {
    const x = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
    const y = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
    return new Position(x, y);
  }

  private _drawViewPort(viewport: GameMap) {
    try {
      this.display.clear();
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
      debugger;
    }
  }

  private _darkenColor(color: string, darkenValue: number): string {
    return Color(color)
      .darken(darkenValue)
      .hex();
  }
}
