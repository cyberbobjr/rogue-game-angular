import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {JsonEntity} from '../../../modules/game/services/storage.service';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';
import {IGameClass} from '../../interfaces/i-game-class';
import {IRace} from '../../interfaces/i-race';
import {MapEngine} from '../../../modules/game/services/map-engine.service';

export class Player extends Entity {
  private _xp = 0;
  private _hitDice: number;
  private _level = 1;
  private _gameClass: IGameClass;
  private _race: IRace;

  get gameClass(): IGameClass {
    return this._gameClass;
  }

  get ca(): number {
    return 10 + this.attributes.get('dexterity');
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

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
      position: this.position,
      sprite: this.sprite,
      hp: this.hp,
      xp: this.xp,
      gp: this.gp,
      hitDice: this.hitDice,
      strength: this.strength,
      constitution: this.constitution,
      charisma: this.charisma,
      wisdom: this.wisdom,
      intelligence: this.intelligence,
      dexterity: this.dexterity,
      level: this.level,
      type: this.type,
      name: this.name,
    };
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

  setRace(race: IRace): Player {
    this._race = race;
    return this;
  }

  setClass(gameClass: IGameClass): Player {
    this._gameClass = gameClass;
    this._hitDice = gameClass.getHitDice();
    return this;
  }

  onHit(attacker: Entity, damage: number): Iaction | null {
    EventLog.getInstance().message = `You take ${damage} point of damage`;
    return null;
  }

  onDead(_mapEngine: MapEngine): void {
  }
}
