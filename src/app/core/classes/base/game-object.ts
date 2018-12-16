import {Iobject} from '../../interfaces/iobject';
import {Sprite} from './sprite';
import {Position} from './position';

export class GameObject implements Iobject {
  name: string;
  position: Position;
  sprite: Sprite;

  getInfo(): string {
    return '';
  }
}
