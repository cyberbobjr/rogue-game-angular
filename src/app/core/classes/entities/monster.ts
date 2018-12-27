import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Tile} from '../base/tile';
import {GameMonsterClass} from '../base/game-monster-class';
import {JsonEntity, JsonWeapon} from '../../interfaces/json-interfaces';
import {Gold} from '../gameObjects/gold';
import {GameObject} from '../gameObjects/game-object';
import {Weapon} from '../gameObjects/weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Iaction} from '../../interfaces/iaction';
import {WalkAction} from '../actions/walk-action';
import {ChaseAction} from '../actions/chase-action';
import {IdleAction} from '../actions/idle-action';

export class Monster extends Entity {
  static fromJSON(jsonData: JsonEntity): Entity {
    let entity: Entity = new this();
    entity = Object.assign(entity, jsonData, {
      _position: new Position(jsonData.position._x, jsonData.position._y),
      _sprite: new Sprite(jsonData.sprite._character, jsonData.sprite._color)
    });

    if (jsonData.inventory.length > 0) {
      jsonData.inventory.forEach((value: { id: string, objectType: string, _jsonData: JsonWeapon }, index: number) => {
        entity.addToInventory(GameObjectFactory.createFromJson(value.objectType, value));
      });
    }

    return entity;
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


  onHit(actor: Entity, damage: number): Iaction | null {
    const currentAction: Iaction = this.getAction();
    const resultAction: Iaction | null = super.onHit(actor, damage);
    if (!resultAction && (!currentAction || currentAction instanceof IdleAction)) {
      this.setNextAction(new ChaseAction(this));
    }
    return null;
  }
}
