import {Sprite} from '../base/sprite';
import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';
import {Player} from '../entities/player';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {EventLog} from '../event-log';

export class Food extends GameObject {
  protected _sprite: Sprite;
  objectType = 'FOOD';

  get id(): string {
    return 'FOOD';
  }

  get name(): string {
    return 'food';
  }

  get properties(): Array<string> {
    return [];
  }

  static fromJson(): Food {
    return new this();
  }

  constructor() {
    super();
    this._sprite = SpritesFactory.createSprite(SpriteType.FOOD);
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
