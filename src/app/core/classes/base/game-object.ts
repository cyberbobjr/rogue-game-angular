import {Sprite} from './sprite';
import {Entity} from './entity';

export abstract class GameObject {
  name: string;
  sprite: Sprite;
  objectType: string;

  abstract getInfo(): string ;

  abstract onTake(actor: Entity): void ;
}
