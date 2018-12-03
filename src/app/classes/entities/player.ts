import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';

export class Player extends Entity {

  constructor(props) {
    super(props);
    this.sprite = SpritesFactory.createSprite(SpriteType.PLAYER);
    this.sprite.light = true;
  }

  onHit(attacker: Entity): Iaction | null {
    EventLog.getInstance().message = 'You get hit!';
    console.log('hit by monster');
    return super.onHit(attacker);
  }
}
