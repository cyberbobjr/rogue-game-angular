import {Position} from '../classes/base/position';
import {GameMap} from '../classes/base/game-map';

export interface IEffect {
  type: string;
  position: Position;
  color: string;
  intensity: number;

  tick(timestamp: number);

  draw_callback(gameMap: GameMap): GameMap;

  unregister_callback();
}
