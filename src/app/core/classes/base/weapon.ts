import {Iobject} from '../../interfaces/iobject';
import {Sprite} from './sprite';
import {Position} from './position';

export class Weapon implements Iobject {
  name: string;
  position: Position;
  sprite: Sprite;

  static fromJson() {

  }

  constructor() {

  }
}
