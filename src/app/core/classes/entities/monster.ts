import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {TilesFactory} from '../../factories/tiles-factory';
import {TileType} from '../../enums/tile-type.enum';
import {GoldTile} from '../tiles/gold-tile';
import {Tile} from '../base/tile';
import {GameMonsterClass} from '../base/game-monster-class';
import {JsonEntity} from '../../interfaces/json-interfaces';
import {Gold} from '../base/gold';
import {Iobject} from '../../interfaces/iobject';

export class Monster extends Entity {
  static fromJson(jsonData: JsonEntity): Monster {
    const {name, id, type, gp, hp, strength, constitution, charisma, wisdom, intelligence, dexterity, ac} = jsonData;
    const monster: Monster = new this();

    monster.id = id;
    monster.name = name;
    monster.position = new Position(jsonData.position._x, jsonData.position._y);
    monster.sprite = new Sprite(jsonData.sprite._character, jsonData.sprite._color);
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

  static fromMonsterClass(monsterClass: GameMonsterClass): Monster {
    const monster: Monster = new this();
    monster.sprite = monsterClass.sprite;
    monster.id = monsterClass.id;
    monster.name = monsterClass.name;
    monster.hp = monsterClass.hp;
    monster.gp = monsterClass.gp;
    monster.strength = monsterClass.strength;
    monster.dexterity = monsterClass.dexterity;
    monster.constitution = monsterClass.constitution;
    monster.intelligence = monsterClass.intelligence;
    monster.wisdom = monsterClass.wisdom;
    monster.charisma = monsterClass.charisma;
    monster.ac = monsterClass.ac;
    monster.gp = monsterClass.gp;
    return monster;
  }

  onDead(mapEngine: MapEngine): void {
    // drop gold
    const goldObject: Iobject = new Gold(this.gp);
    const tile: Tile = mapEngine.getTileAt(this.position);
    tile.dropOn(goldObject);
  }

  constructor() {
    super();
  }
}
