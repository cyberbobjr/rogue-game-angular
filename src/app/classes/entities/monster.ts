import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Sprite} from '../base/sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../base/position';

export class Monster extends Entity {
  protected _timeDisplaySprite: number;

  static fromJson(name: string, position: Position, sprite: Sprite, jsonData: any): Monster {
    const {type, hp} = jsonData;
    const monster: Monster = new this(name, position, sprite);
    monster.hp = hp;
    monster.type = type;
    return monster;
  }

  toJSON(): any {
    return {type: this.type, hp: this._hp, name: this._name, position: this._position, sprite: this._sprite};
  }

  onWalk(actor: Entity): Iaction | null {
    console.log('monster onWalk');
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    EventLog.getInstance().message = this.name + ' hitted';
    this.hp--;
    this._backupSprite = this._sprite;
    this._sprite = SpritesFactory.createSprite(SpriteType.HITMONSTER);
    this._timeDisplaySprite = performance.now();
    return null;
  }

  tick() {
    const delta: number = (performance.now() - this._timeDisplaySprite);
    if (this._backupSprite && (delta / 1000) > 0.25) {
      Object.assign(this._sprite, this._backupSprite);
      this._backupSprite = null;
    }
  }
}
