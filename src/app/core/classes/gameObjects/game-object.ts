import {Sprite} from '../base/sprite';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';

export abstract class GameObject {
  protected _id: string;
  protected _name: string;
  protected _sprite: Sprite;
  protected _qty = 1;

  empilable = true;
  name: string;
  objectType: string;

  get id(): string {
    return this._id;
  }

  get qty(): number {
    return this._qty;
  }

  set qty(value: number) {
    this._qty = value;
  }

  abstract getInfo(): string ;

  // region events
  onTake(actor: Entity, letterInventory?: string) {
    actor.addToInventory(this);
  }

  onUse(actor: Entity, letterInventory?: string) {

  }

  onEquip(actor: Entity, letterInventory?: string) {

  }

  onUnequip(actor: Entity, letterInventory?: string) {

  }

  // endregion

  // region capabilities
  canTake(): boolean {
    return true;
  }

  canUse(): boolean {
    return false;
  }

  canEquip(): boolean {
    return false;
  }

  // endregion
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
