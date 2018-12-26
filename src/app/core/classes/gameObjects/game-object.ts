import {Sprite} from '../base/sprite';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';

export abstract class GameObject {
  name: string;
  sprite: Sprite;
  objectType: string;

  abstract getInfo(): string ;

  abstract onTake(actor: Entity): void ;

  abstract getSlots(): Array<SlotType>;
}
