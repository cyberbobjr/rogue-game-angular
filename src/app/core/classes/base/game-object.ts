import {IObject} from '../../interfaces/IObject';
import {Sprite} from './sprite';
import {Position} from './position';

export class GameObject implements IObject {
  name: string;
  position: Position;
  sprite: Sprite;
}
