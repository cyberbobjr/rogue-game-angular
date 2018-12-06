import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {JsonEntity} from '../../services/storage.service';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';

export class Player extends Entity {
  private _xp = 0;
  private _hitDice: number;

  get hitDice(): number {
    return this._hitDice;
  }

  set hitDice(value: number) {
    this._hitDice = value;
  }

  get xp(): number {
    return this._xp;
  }

  set xp(value: number) {
    this._xp = value;
  }

  static fromJSON(json: JsonEntity): Player {
    const {position, sprite, hp, xp, hitDice, strength, constitution, charisma, wisdom, intelligence, dexterity} = json;
    const player: Player = new this('player', new Position(position._x, position._y), new Sprite(sprite._character, sprite._color, sprite._bgColor));
    player.hp = hp;
    player.strength = strength;
    player.constitution = constitution;
    player.charisma = charisma;
    player.wisdom = wisdom;
    player.intelligence = intelligence;
    player.dexterity = dexterity;
    player.xp = xp;
    player.hitDice = hitDice;
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
