import {Position} from '../classes/base/position';
import {GameMap} from '../classes/base/gameMap';
import {Iobject} from './iobject';

export interface IEffect {
  type: string;
  position: Position;
  color: string;
  intensity: number;

  tick(timestamp: number);

  draw_callback(gameMap: GameMap<Iobject>): GameMap<Iobject>;

  unregister_callback();
}
