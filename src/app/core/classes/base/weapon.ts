import {Sprite} from './sprite';
import {Position} from './position';
import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {Entity} from './entity';

export class Weapon extends GameObject {
  id: string;
  name: string;
  position: Position;
  sprite: Sprite;

  static fromJson(_jsonData: JsonWeapon): Weapon {
    return new this(_jsonData);
  }

  constructor(private _jsonData: JsonWeapon) {
    super();
    this.id = _jsonData.id;
    this.name = _jsonData.name;
    this.sprite = new Sprite(_jsonData.sprite.character, _jsonData.sprite.color);
  }

  getInfo(): string {
    return `${this.name}`;
  }

  onTake(actor: Entity): void {
    console.log(actor);
    console.log(this);
  }
}
