import {Injectable} from '@angular/core';
import {Position} from '../../../core/classes/base/position';
import {GameMap} from '../../../core/classes/base/game-map';
import {Sprite} from '../../../core/classes/base/sprite';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {Display} from 'rot-js/lib';
import {EntitiesEngine} from './entities-engine.service';
import {Player} from '../../../core/classes/entities/player';
import * as Color from 'color';
import {Entity} from '../../../core/classes/base/entity';
import {IEffect} from '../../../core/interfaces/i-effect';
import {Utility} from '../../../core/classes/utility';
import {Tile} from '../../../core/classes/base/tile';

interface BufferTile {
  sprite: Sprite;
  los: number;
}

@Injectable({
              providedIn: 'root'
            })
export class DisplayEngine {
  private _display: Display = new Display();
  maxVisiblesCols = 20;
  maxVisiblesRows = 20;
  buffer: Array<Array<BufferTile | number>>;

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
    this.buffer = Utility.initArrayNumber(this.maxVisiblesCols, this.maxVisiblesRows);
  }

  public computeVisiblesRowsCols() {
    const [width, height] = (this.display.computeSize(this.container.offsetWidth, this.container.offsetHeight));
    this.maxVisiblesCols = width;
    this.maxVisiblesRows = height;
  }

  public drawGameMap(gameMap: GameMap) {
    // prepare map for drawing
    const cameraPosition = gameMap.gameEntities.getPlayer().position;
    const cameraStartPosition: Position = this._getStartViewPortOfPosition(cameraPosition);
    // get map data
    const bufferTile: Tile[][] = gameMap.extractTiles(cameraStartPosition.x, cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
    const bufferLos: number[][] = gameMap.extractLosMap(cameraStartPosition.x, cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
    const entities: Array<Entity> = gameMap.getEntitiesVisiblesOnMap();
    // build buffer
    const buffer: Array<Array<BufferTile>> = this._buildBuffer(bufferTile, bufferLos, entities);

    this._display.clear();
    this._drawBuffer(buffer);
  }

  private _buildBuffer(bufferTile: Tile[][], bufferLos: number[][], entities: Array<Entity>): Array<Array<BufferTile>> {
    const buffer: Array<Array<BufferTile>> = new Array(bufferTile.length);
    for (let y = 0; y < bufferTile.length; y++) {
      buffer[y] = new Array(bufferTile[y].length);
      for (let x = 0; x < bufferTile[y].length; x++) {
        const tile: Tile = bufferTile[y][x];
        const entityPresent: Entity | undefined = entities.find(entity => entity.position.equal(tile.position));
        buffer[y][x] = {sprite: entityPresent ? entityPresent.sprite : tile.sprite, los: bufferLos[y][x]};
      }
    }
    return buffer;
  }

  private _getStartViewPortOfPosition(cameraPosition: Position) {
    const x = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
    const y = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
    return new Position(x, y);
  }

  private _drawBuffer(buffer: Array<Array<BufferTile>>) {
    try {
      for (let j = 0; j < buffer.length; j++) {
        for (let i = 0; i < buffer[j].length; i++) {
          const sprite: Sprite = buffer[j][i].sprite;
          const losValue: number = buffer[j][i].los;
          if (sprite && losValue > 0) {
            this._display.draw(i, j, sprite.character, this._darkenColor(sprite.color, losValue), this._darkenColor(sprite.bgColor, losValue));
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
