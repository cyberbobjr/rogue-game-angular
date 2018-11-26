import {GameMap} from '../classes/gameMap';
import {IEntity} from './ientity';

export interface IMapEngine {
  generateMap(width: number, height: number): GameMap<IEntity>;
}
