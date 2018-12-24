import {Sprite} from './sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Entity} from './entity';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';

export class Gold implements GameObject {
  name = 'Gold';
  sprite: Sprite;
  objectType = 'GOLD';

  get amount(): number {
    return this._amount;
  }

  constructor(private _amount: number) {
    this.sprite = SpritesFactory.createSprite(SpriteType.GOLD);
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
