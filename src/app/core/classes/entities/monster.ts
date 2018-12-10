import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Sprite} from '../base/sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../base/position';
import {EntityType} from '../../enums/entity-type.enum';

export class Monster extends Entity {

  static fromJson(name: string, position: Position, sprite: Sprite, jsonData: any): Monster {
    const {type, gp, hp, strength, constitution, charisma, wisdom, intelligence, dexterity, ac} = jsonData;
    const monster: Monster = new this(name, position, sprite);
    monster.strength = strength;
    monster.dexterity = dexterity;
    monster.constitution = constitution;
    monster.intelligence = intelligence;
    monster.wisdom = wisdom;
    monster.charisma = charisma;
    monster.ac = ac;
    monster.hp = hp;
    monster.gp = gp;
    monster.type = type;
    return monster;
  }

  toJSON(): any {
    return {
      name: this.name,
      position: this.position,
      sprite: this.sprite,
      strength: this.strength,
      dexterity: this.dexterity,
      constitution: this.constitution,
      intelligence: this.intelligence,
      wisdom: this.wisdom,
      charisma: this.charisma,
      ac: this.ac,
      hp: this.hp,
      gp: this.gp,
      type: this.type
    };
  }

  onWalk(actor: Entity): Iaction | null {
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
