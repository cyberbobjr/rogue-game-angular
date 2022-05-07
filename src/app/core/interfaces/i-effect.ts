import {Position} from '../classes/base/position';
import {GameMapImp} from '../classes/base/game-map-imp';

export interface IEffect {
  type: string;
  position: Position;
  color: string;
  intensity: number;

  tick(timestamp: number);

  draw_callback(gameMap: GameMapImp): GameMapImp;

  unregister_callback();
}
