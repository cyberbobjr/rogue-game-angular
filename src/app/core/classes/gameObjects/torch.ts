import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {SlotType} from '../../enums/equiped-type.enum';
import {EventLog} from '../event-log';

export class Torch extends GameObject {
  protected _name: string;
  protected _sprite: Sprite = new Sprite('i', '#66bbe2');
  protected _id = 'torch';

  name = 'Torch';
  objectType = 'TORCH';

  getInfo(): string {
    return 'a torch';
  }

  getSlots(): Array<SlotType> {
    return [SlotType.LEFTHAND, SlotType.RIGHTHAND];
  }

  canEquip(): boolean {
    return true;
  }

  onEquip(actor: Entity, letterInventory?: string) {
    if (actor.equipItem(letterInventory)) {
      actor.ligthPower = 10;
      EventLog.getInstance().message = 'You see better';
    }
  }

  onUnequip(actor: Entity, letterInventory?: string) {
    if (actor.unequipItem(letterInventory)) {
      actor.ligthPower = 3;
    }
  }
}