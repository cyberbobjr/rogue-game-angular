import {Position2D} from '../core/base/position2D';
import {GameMapImp} from '../core/base/game-map-imp';

export interface IEffect {
  type: string;
  position: Position2D;
  color: string;
  intensity: number;

  tick(timestamp: number);

  draw_callback(gameMap: GameMapImp): GameMapImp;

  unregister_callback();
}
