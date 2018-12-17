import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';
import {Monster} from '../classes/entities/monster';
import {Position} from '../classes/base/position';
import {JsonEntity} from '../interfaces/json-interfaces';
import {GameMonsterClass} from '../classes/base/game-monster-class';
import * as gamemonster from '../rules/race/monster.json';

export class EntitiesFactory {
  private static instance: EntitiesFactory;
  private _monstersClass: Map<string, GameMonsterClass> = new Map<string, GameMonsterClass>();

  static getInstance(): EntitiesFactory {
    if (!EntitiesFactory.instance) {
      EntitiesFactory.instance = new EntitiesFactory();
    }
    return EntitiesFactory.instance;
  }

  static createFromJson(jsonData: JsonEntity): Entity {
    return Monster.fromJson(jsonData);
  }

  constructor() {
    console.log('EntitiesFactory created');
    for (const key of Object.keys(gamemonster.default)) {
      this._monstersClass.set(gamemonster.default[key].id, new GameMonsterClass(gamemonster.default[key]));
    }
  }

  createEntity(type: EntityType, position?: Position): Entity | null {
    switch (type) {
      case EntityType.PLAYER:
        return new Player('player', position);
      case EntityType.ORC:
        return Monster.fromMonsterClass(this._monstersClass.get('ORC'))
                      .setPosition(position);
      default:
        return null;
    }
  }
}
