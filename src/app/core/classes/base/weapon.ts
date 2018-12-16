import {Iobject} from '../../interfaces/iobject';
import {Sprite} from './sprite';
import {Position} from './position';
import {JsonWeapon} from '../../interfaces/json-interfaces';

export class Weapon implements Iobject {
  name: string;
  position: Position;
  sprite: Sprite;

  constructor(private _jsonData: JsonWeapon) {
    this.name = _jsonData.name;
  }

  getInfo(): string {
    return `${this.name}`;
  }
}
