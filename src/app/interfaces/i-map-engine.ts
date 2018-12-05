import {GameMap} from '../classes/base/gameMap';
import {IObject} from './IObject';

export interface IMapEngine {
  generateMap(width: number, height: number): GameMap<IObject>;
}
