import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {JsonEntity} from '../../services/storage.service';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';

export class Player extends Entity {
  static fromJSON(json: JsonEntity): Player {
    const {position, sprite, strength, hp} = json;
    const player: Player = new this('player', new Position(position._x, position._y), new Sprite(sprite._character, sprite._color, sprite._bgColor));
    player.hp = hp;
    player.strength = strength;
    return player;
  }

  constructor(props, position?: Position, sprite?: Sprite) {
    super(props);
    if (position) {
      this.position = position;
    }
    if (sprite) {
      this.sprite = sprite;
    } else {
      this.sprite = SpritesFactory.createSprite(SpriteType.PLAYER);
    }
    this.sprite.light = true;
  }

  onHit(attacker: Entity): Iaction | null {
    EventLog.getInstance().message = 'You get hit!';
    return null;
  }
}
