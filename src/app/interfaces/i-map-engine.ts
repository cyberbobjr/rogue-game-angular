import {GameMap} from '../classes/gameMap';
import {IEntity} from './ientity';

export interface IMapEngine {
  generateNewMap(width: number, height: number): GameMap<IEntity>;
}
