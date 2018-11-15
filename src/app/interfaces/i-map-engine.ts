import {Position} from '../classes/position';

export interface IMapEngine {
  isWalkable(position: Position): boolean;

  generateNewMap(width: number, height: number): Array<Array<string>>;
}
