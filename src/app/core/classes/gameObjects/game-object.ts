import {Sprite} from '../base/sprite';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {JsonGameObject, JsonSprite} from '../../interfaces/json-interfaces';

export abstract class GameObject implements JsonGameObject {
  protected _id: string;
  protected _name: string;
  protected _sprite: JsonSprite | Sprite;
  protected _qty = 1;
  protected _empilable = true;
  protected _type: string;
  protected _objectType: string;
  protected _cost: {
    unit: string,
    value: number
  };
  protected _weight: number;
  protected _properties: [string];

  set sprite(value: JsonSprite | Sprite) {
    if (value instanceof Sprite) {
      this._sprite = value;
    } else {
      this._sprite = new Sprite(value.character, value.color);
    }
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get cost(): { unit: string; value: number } {
    return this._cost;
  }

  set cost(value: { unit: string; value: number }) {
    this._cost = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }

  get properties(): [string] {
    return this._properties;
  }

  set properties(value: [string]) {
    this._properties = value;
  }

  set id(value: string) {
    this._id = value;
  }

  get empilable(): boolean {
    return this._empilable;
  }

  set empilable(value: boolean) {
    this._empilable = value;
  }

  get objectType(): string {
    return this._objectType;
  }

  set objectType(value: string) {
    this._objectType = value;
  }

  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

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
    return this._sprite as Sprite;
  }

  toJSON(): JsonGameObject {
    return {
      'id': this._id,
      'name': this._name,
      'sprite': (this._sprite as Sprite).toJSON(),
      'qty': this._qty,
      'empilable': this._empilable,
      'type': this._type,
      'objectType': this._objectType,
      'cost': this._cost,
      'weight': this._weight,
      'properties': this._properties
    };
  }

  protected constructor() {

  }
}
