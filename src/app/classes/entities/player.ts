import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {JsonPlayer} from '../../services/storage.service';
import {Position} from '../position';
import {Sprite} from '../base/sprite';

export class Player extends Entity {
  static fromJSON(json: JsonPlayer): Player {
    const position = json._position;
    const sprite = json._sprite;
    return new this('player', new Position(position._x, position._y), new Sprite(sprite._character, sprite._color, sprite._bgColor));
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
