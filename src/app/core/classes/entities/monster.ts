import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Tile} from '../base/tile';
import {GameMonsterClass} from '../base/game-monster-class';
import {JsonEntity} from '../../interfaces/json-interfaces';
import {Gold} from '../base/gold';
import {GameObject} from '../gameObjects/game-object';
import {Weapon} from '../gameObjects/weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';

export class Monster extends Entity {
  static fromJSON(jsonData: JsonEntity): Entity {
    const entity: Entity = new this();
    return Object.assign(entity, jsonData, {
      _position: new Position(jsonData.position._x, jsonData.position._y),
      _sprite: new Sprite(jsonData.sprite._character, jsonData.sprite._color),
      _inventory: jsonData.inventory.map(({id, objectType, _jsonData}) => {
        return GameObjectFactory.createFromJson(objectType, _jsonData) as Weapon;
      })
    });
  }

  static fromMonsterClass(monsterClass: GameMonsterClass): Monster {
    const monster: Monster = new this();
    monster.sprite = monsterClass.sprite;
    monster.id = monsterClass.id;
    monster.name = monsterClass.name;
    monster.size = monsterClass.size;
    monster.speed = monsterClass.speed;
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
    monster.setInventory(monsterClass.weapons);
    return monster;
  }

  constructor() {
    super();
  }

  onDead(mapEngine: MapEngine): void {
    // drop gold
    const goldObject: GameObject = new Gold(this.gp);
    const tile: Tile = mapEngine.getTileAt(this.position);
    tile.dropOn(goldObject);
    // drop weapon
    this._inventory.forEach((weapon: Weapon) => {
      tile.dropOn(weapon);
    });
  }

  setPosition(position: Position): Monster {
    this.position = position;
    return this;
  }
}
