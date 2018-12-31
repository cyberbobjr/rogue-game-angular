import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {SlotType} from '../../enums/equiped-type.enum';

export class Torch extends GameObject {
  protected _name: string;
  protected _sprite: Sprite;
  protected _id = 'torch';

  name = 'Torch';
  objectType = 'TORCH';

  getInfo(): string {
    return 'a torch';
  }

  getSlots(): Array<SlotType> {
    return [SlotType.LEFTHAND, SlotType.RIGHTHAND];
  }

  getSprite(): Sprite {
    return undefined;
  }

  canEquip(): boolean {
    return true;
  }
}
