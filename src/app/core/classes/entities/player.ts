import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {JsonEntity} from '../../interfaces/json-interfaces';
import {IGameClass} from '../../interfaces/i-game-class';

export class Player extends Entity {
  private _xp = 0;
  private _level = 1;
  private _gameClass: IGameClass = null;

  get ca(): number {
    return 10 + this.attributes.get('dexterity');
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

  static fromJSON(json: JsonEntity): Player {
    const {gp, position, sprite, hp, xp, hitDice, strength, constitution, charisma, wisdom, intelligence, dexterity, level} = json;
    const player: Player = new this('player');
    player.sprite = new Sprite(sprite._character, sprite._color, sprite._bgColor);
    if (position) {
      player.position = new Position(position._x, position._y);
    }
    player.hp = hp;
    player.gp = gp;
    player.strength = strength;
    player.constitution = constitution;
    player.charisma = charisma;
    player.wisdom = wisdom;
    player.intelligence = intelligence;
    player.dexterity = dexterity;
    player.xp = xp;
    player.hitDice = hitDice;
    player.level = level;
    return player;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        xp: this.xp,
        level: this.level,
      }
    };
  }

  constructor(props, position?: Position, sprite?: Sprite) {
    super();
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

  setClass(gameClass: IGameClass): Entity {
    this._gameClass = gameClass;
    this._hitDice = gameClass.getHitDice();
    return this;
  }

  onHit(attacker: Entity, damage: number): Iaction | null {
    EventLog.getInstance().message = `You take ${damage} point of damage`;
    return null;
  }

  onDead(_mapEngine: MapEngine): void {
    super.onDead(_mapEngine);
  }
}
