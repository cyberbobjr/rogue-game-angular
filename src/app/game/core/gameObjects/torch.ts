import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {SlotType} from '../../enums/equiped-type.enum';
import {EventLog} from '../Utility/event-log';

export class Torch extends GameObject {
  protected _sprite: Sprite = new Sprite('i', '#66bbe2');

  static fromJson(jsonData: any): Torch {
    const torch: Torch = new this();
    if (jsonData._qty) {
      torch.qty = jsonData._qty;
    }
    return torch;
  }

  getInfo(): string {
    return 'torch';
  }

  getSlots(): Array<SlotType> {
    return [SlotType.LEFTHAND, SlotType.RIGHTHAND];
  }

  canEquip(): boolean {
    return true;
  }

  onEquip(actor: Entity, letterInventory?: string) {
    actor.lightPower = 10;
    EventLog.getInstance().message = 'You see better';
  }

  onUnequip(actor: Entity, letterInventory?: string) {
    actor.lightPower = 3;
  }

  constructor() {
    super();
    this._name = 'Torch';
    this._id = 'torch';
    this._objectType = 'TORCH';
  }

}
