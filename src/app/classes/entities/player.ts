import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {JsonPlayer} from '../../services/storage.service';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';

export class Player extends Entity {
  static fromJSON(json: JsonPlayer): Player {
    const {_position, _sprite} = json;
    return new this('player', new Position(_position._x, _position._y), new Sprite(_sprite._character, _sprite._color, _sprite._bgColor));
  }

  toJSON(): any {
    return {name: this._name, _position: this._position, _sprite: this._sprite};
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
