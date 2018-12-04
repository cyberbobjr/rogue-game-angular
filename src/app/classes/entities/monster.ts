import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Sprite} from '../base/sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../position';

export class Monster extends Entity {
  protected _backupSprite: Sprite = null;
  protected _timeDisplaySprite: number;

  static fromJson(name: string, position: Position, sprite: Sprite): Monster {
    let monster: Monster = new this(name, position, sprite);
    Object.entries(monster)
          .forEach((entry) => {
            console.log(entry);
          });
    return monster;
  }

  toJSON(): string {
    return JSON.stringify({hp: this._hp});
  }

  constructor(props, position?: Position, sprite?: Sprite) {
    super(props);
    if (position) {
      this.position = position;
    }
    if (sprite) {
      this.sprite = sprite;
    }
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
