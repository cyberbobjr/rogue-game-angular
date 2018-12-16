import {Sprite} from './sprite';
import {Position} from './position';
import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {Entity} from './entity';

export class Weapon extends GameObject {
  name: string;
  position: Position;
  sprite: Sprite;

  constructor(private _jsonData: JsonWeapon) {
    super();
    this.name = _jsonData.name;
  }

  getInfo(): string {
    return `${this.name}`;
  }

  onTake(actor: Entity): void {
  }
}
