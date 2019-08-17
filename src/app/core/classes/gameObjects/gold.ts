import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Entity} from '../base/entity';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';

export class Gold extends GameObject {
  name = 'Gold';

  get id(): string {
    return 'GOLD';
  }

  get amount(): number {
    return this._amount;
  }

  constructor(private _amount: number) {
    super();
    this._sprite = SpritesFactory.createSprite(SpriteType.GOLD);
    this.objectType = 'GOLD';
  }

  getInfo(): string {
    return `${this._amount} gold pieces`;
  }

  onTake(actor: Entity): void {
    actor.gp += this.amount;
  }

  getSlots(): Array<SlotType> {
    return [];
  }
}
