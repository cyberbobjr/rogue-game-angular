import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Sprite} from '../base/sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../base/position';

export class Monster extends Entity {

  static fromJson(name: string, position: Position, sprite: Sprite, jsonData: any): Monster {
    const {type, hp, strength} = jsonData;
    const monster: Monster = new this(name, position, sprite);
    monster.hp = hp;
    monster.type = type;
    monster.strength = strength;
    return monster;
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
}
