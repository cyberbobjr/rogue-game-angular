import {Sprite} from './sprite';
import {Entity} from './entity';
import {SlotType} from '../../enums/equiped-type.enum';

export abstract class GameObject {
  name: string;
  sprite: Sprite;
  objectType: string;

  abstract getInfo(): string ;

  abstract onTake(actor: Entity): void ;

  abstract getSlots(): Array<SlotType>;
}
