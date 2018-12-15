import {GameMap} from '../classes/base/gameMap';
import {Iobject} from './iobject';

export interface IMapEngine {
  generateMap(width: number, height: number): GameMap<Iobject>;
}
