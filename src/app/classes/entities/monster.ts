import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Sprite} from '../base/sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';

export class Monster extends Entity {
  protected _backupSprite: Sprite = null;
  protected _timeDisplaySprite: number;

  constructor(props) {
    super(props);
  }

  onWalk(actor: Entity): Iaction | null {
    console.log('monster onWalk');
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    EventLog.getInstance().message = this.name + ' hitted';
    this.hp--;
    this._backupSprite = Object.create(this._sprite);
    this._sprite = SpritesFactory.createSprite(SpriteType.HITMONSTER);
    this._timeDisplaySprite = performance.now();
    return null;
  }

  tick() {
    const delta: number = (performance.now() - this._timeDisplaySprite);
    if (this._backupSprite && (delta / 1000) > 0.25) {
      this._sprite = this._backupSprite;
      this._backupSprite = null;
    }
  }
}
