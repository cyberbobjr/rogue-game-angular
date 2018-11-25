import {GameMap} from '../classes/gameMap';
import {Tile} from '../classes/tile';

export interface IMapEngine {
  generateNewMap(width: number, height: number): GameMap<Tile>;
}
