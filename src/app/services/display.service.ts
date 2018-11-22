import {Injectable} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {MapEngine} from './map-engine.service';
import {EntitiesService} from './entities.service';
import {Position} from '../classes/position';
import {DisplayOptions} from 'rot-js/lib/display/types';
import {GameMap} from '../classes/gameMap';
import {Tile} from '../classes/tile';

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
    this.display.clear();
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
    this.maxVisiblesRows = height;
  }

  draw() {
    let gameMap = this.mapEngine.map.clone();
    gameMap = this.putEntitiesOn(gameMap);
    const viewport: GameMap<Tile> = this.computeViewport(gameMap);
    this.display.clear();
    this.drawViewPort(viewport);
  }

  centerCameraOnPosition(cameraPosition: Position) {
    this.cameraStartPosition.col = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
    this.cameraStartPosition.row = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
  }

  private drawViewPort(viewport: GameMap<Tile>) {
    for (let j = 0; j < viewport.content.length; j++) {
      for (let i = 0; i < viewport.content[0].length; i++) {
        this.display.draw(i, j, viewport.content[j][i].character, 'gray', null);
      }
    }
  }

  private putEntitiesOn(gameMap: GameMap<Tile>): GameMap<Tile> {
    for (const actor of this.entitiesService.entities) {
      gameMap.content[actor.position.y][actor.position.x].character = actor.character;
    }
    return gameMap;
  }

  private computeViewport(currentMap: GameMap<Tile>): GameMap<Tile> {
    return currentMap.extract(this.cameraStartPosition.col, this.cameraStartPosition.row, this.maxVisiblesCols, this.maxVisiblesRows);
  }
}