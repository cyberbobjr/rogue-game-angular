import {Sprite} from '../classes/base/sprite';
import {Position} from '../classes/base/position';

export interface IObject {
  name: string;
  sprite: Sprite;
  position: Position;
}
