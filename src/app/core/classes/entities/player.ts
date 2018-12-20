import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {JsonEntity} from '../../interfaces/json-interfaces';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Weapon} from '../base/weapon';

export class Player extends Entity {
  private _xp = 0;
  private _level = 1;
  private _mapLevel = 1;

  get mapLevel(): number {
    return this._mapLevel;
  }

  set mapLevel(value: number) {
    this._mapLevel = value;
  }

  get ac(): number {
    return 10 + this.attributes.get('dexterity');
  }

  set ac(value: number) {
    this._ac = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get xp(): number {
    return this._xp;
  }

  set xp(value: number) {
    this._xp = value;
  }

  static fromJSON(jsonData: JsonEntity): Player {
    let entity: Player = new this();
    entity = Object.assign(entity, jsonData, {
      _sprite: new Sprite(jsonData.sprite._character, jsonData.sprite._color),
      _inventory: jsonData.inventory.map(({id, objectType, _jsonData}) => {
        return GameObjectFactory.createFromJson(objectType, _jsonData) as Weapon;
      })
    });
    if (jsonData.position) {
      entity.position = new Position(jsonData.position._x, jsonData.position._y);
    }
    return entity;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        xp: this.xp,
        level: this.level
      }
    };
  }

  constructor(position?: Position, sprite?: Sprite) {
    super();
    if (position) {
      this.position = position;
    }
    this.sprite = sprite ? sprite : SpritesFactory.createSprite(SpriteType.PLAYER);
    this.sprite.light = true;
  }

  onHit(attacker: Entity, damage: number): Iaction | null {
    EventLog.getInstance().message = `You take ${damage} point of damage`;
    return null;
  }

  onDead(_mapEngine: MapEngine): void {
    super.onDead(_mapEngine);
  }
}
