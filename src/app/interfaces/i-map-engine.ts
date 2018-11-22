import {Position} from '../classes/position';
import {GameMap} from '../classes/gameMap';
import {Tile} from '../classes/tile';

export interface IMapEngine {
  isWalkable(position: Position): boolean;

  generateNewMap(width: number, height: number): GameMap<Tile>;
}
