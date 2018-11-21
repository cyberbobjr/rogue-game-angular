import {Position} from '../classes/position';
import {GameMap} from '../classes/gameMap';

export interface IMapEngine {
  isWalkable(position: Position): boolean;

  generateNewMap(width: number, height: number): GameMap;
}
