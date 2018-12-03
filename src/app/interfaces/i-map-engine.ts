import {GameMap} from '../classes/gameMap';
import {IObject} from './IObject';

export interface IMapEngine {
  generateMap(width: number, height: number): GameMap<IObject>;
}
