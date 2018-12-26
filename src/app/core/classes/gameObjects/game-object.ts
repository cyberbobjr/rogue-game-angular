import {Sprite} from '../base/sprite';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {JsonWeapon} from '../../interfaces/json-interfaces';

export abstract class GameObject {
  protected _id: string;
  protected _name: string;
  protected _sprite: Sprite;
  name: string;
  objectType: string;

  abstract getInfo(): string ;

  abstract onTake(actor: Entity): void ;

  abstract getSlots(): Array<SlotType>;

  getSprite(): Sprite {
    return this._sprite;
  }

  constructor(protected _jsonData?: any) {
    if (this._jsonData) {
      this._id = _jsonData.id;
      this._name = _jsonData.name;
    }
    if (this._jsonData && this._jsonData.sprite) {
      this._sprite = new Sprite(_jsonData.sprite.character, _jsonData.sprite.color);
    }
  }
}
