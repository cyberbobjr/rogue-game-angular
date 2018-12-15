import {Sprite} from '../classes/base/sprite';
import {Position} from '../classes/base/position';

export interface Iobject {
  name: string;
  sprite: Sprite;
  position: Position;
}
