import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {Player} from '../entities/player';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {EventLog} from '../Utility/event-log';

export class Food extends GameObject {
  protected _name = 'food';

  get id(): string {
    return this._id;
  }

  static fromJson(jsonData: any): Food {
    return new this();
  }

  constructor() {
    super();
    this._sprite = SpritesFactory.createSprite(SpriteType.FOOD);
    this._objectType = 'FOOD';
    this._id = 'food';
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
      EventLog.getInstance().message = `You eat the food, you feel better`;
      (actor as Player).setToFullHp();
    }
    actor.useInventory(letterInventory, 1);
  }

  getSlots(): Array<SlotType> {
    return [];
  }
}
