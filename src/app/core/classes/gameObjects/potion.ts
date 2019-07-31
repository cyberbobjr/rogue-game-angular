import {Sprite} from '../base/sprite';
import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {Player} from '../entities/player';
import {EventLog} from '../Utility/event-log';

export class Potion extends GameObject {
  static fromJson(): Potion {
    return new this();
  }

  constructor() {
    super();
    this._id = 'potion';
    this._objectType = 'POTION';
    this._name = 'Potion';
    this._sprite = new Sprite('i', '#66bbe2');
  }

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
