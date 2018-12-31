import {Sprite} from '../base/sprite';
import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {Player} from '../entities/player';

export class Food extends GameObject {
  protected _sprite: Sprite;
  objectType = 'FOOD';

  get id(): string {
    return this._jsonData.id;
  }

  get name(): string {
    return this._jsonData.name;
  }

  get properties(): Array<string> {
    return this._jsonData.properties;
  }

  static fromJson(_jsonData: JsonWeapon): Food {
    return new this(_jsonData);
  }

  constructor(_jsonData: JsonWeapon) {
    super(_jsonData);
  }

  getInfo(): string {
    return `${this._name}`;
  }

  canUse(): boolean {
    return true;
  }

  onTake(actor: Entity): void {
    actor.addToInventory(this);
  }

  onUse(actor: Entity, letterInventory: string) {
    if (actor instanceof Player) {
      (actor as Player).setToFullHp();
    }
    actor.useInventory(letterInventory, 1);
  }

  getSlots(): Array<SlotType> {
    return [];
  }
}
