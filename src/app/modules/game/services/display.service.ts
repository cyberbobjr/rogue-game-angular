import {Injectable} from '@angular/core';
import {Position} from '../../../core/classes/base/position';
import {GameMap} from '../../../core/classes/base/gameMap';
import {Sprite} from '../../../core/classes/base/sprite';
import {Iobject} from '../../../core/interfaces/iobject';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {Display} from 'rot-js/lib';
import {EntitiesService} from './entities.service';
import {Player} from '../../../core/classes/entities/player';

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

  draw(gameMap: GameMap<Iobject>) {
    const player: Player = this._entitiesService.player;
    const fovMap: Array<Array<number>> = gameMap.computeFOVMap(player.lightRadius, player.ligthPower, this.cameraPosition);
    const viewport: GameMap<Iobject> = this.extractViewport(gameMap);
    this.drawViewPort(viewport, fovMap);
  }

  private _getStartViewPortOfPosition(cameraPosition: Position) {
    const x = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
    const y = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
    return new Position(x, y);
  }

  private drawViewPort(viewport: GameMap<Iobject>, fovMap: Array<Array<number>>) {
    this.display.clear();
    for (let j = 0; j < viewport.height; j++) {
      for (let i = 0; i < viewport.width; i++) {
        const sprite: Sprite = <Sprite>viewport.getDataAt(i, j).sprite;
        if (sprite && sprite.light) {
          this.display.draw(i, j, sprite.character, sprite.color, sprite.bgColor);
        }
      }
    }
  }

  private extractViewport(currentMap: GameMap<Iobject>): GameMap<Iobject> {
    return currentMap.extract(this.cameraStartPosition.x, this.cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
  }
}
