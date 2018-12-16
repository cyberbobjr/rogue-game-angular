import {Sprite} from './sprite';
import {Position} from './position';
import {Entity} from './entity';

export abstract class GameObject {
  name: string;
  position: Position;
  sprite: Sprite;

  abstract getInfo(): string ;

  abstract onTake(actor: Entity): void ;
}
