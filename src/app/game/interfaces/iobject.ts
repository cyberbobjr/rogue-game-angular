import {Sprite} from '../core/base/sprite';
import {Position2D} from '../core/base/position2D';

export interface Iobject {
  name: string;
  sprite: Sprite;
  position: Position2D;

  getInfo(): string;
}
