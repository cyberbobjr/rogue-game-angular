import {Sprite} from '../base/sprite';
import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {Player} from '../entities/player';
import {EventLog} from '../event-log';

export class Potion extends GameObject {
  protected _name: string;
  protected _sprite: Sprite = new Sprite('i', '#66bbe2');
  protected _id = 'potion';

  name = 'Potion';
  objectType = 'POTION';

  getInfo(): string {
    return `a potion`;
  }

  onTake(actor: Entity): void {
    actor.addToInventory(this);
  }

  getSlots(): Array<SlotType> {
    return [];
  }

  onUse(actor: Entity, letterInventory?: string) {
    if (actor instanceof Player) {
      (actor as Player).setToFullHp();
      EventLog.getInstance().message = `You drink the potion, you feel better`;
    }
    actor.useInventory(letterInventory, 1);
  }

  canUse(): boolean {
    return true;
  }
}
