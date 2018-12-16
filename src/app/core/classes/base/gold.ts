import {Iobject} from '../../interfaces/iobject';
import {Sprite} from './sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from './position';
import {Entity} from './entity';

export class Gold implements Iobject {
  name = 'GOLD';
  position: Position;
  sprite: Sprite;

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
}
