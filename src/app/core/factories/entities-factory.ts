import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';
import {Monster} from '../classes/entities/monster';
import {Position} from '../classes/base/position';
import {JsonEntity} from '../interfaces/json-interfaces';
import {GameMonsterClass} from '../classes/base/game-monster-class';
import * as gamemonster from '../rules/race/monster.json';
import {Utility} from '../classes/utility';

export class EntitiesFactory {
  private static instance: EntitiesFactory;
  private _monstersClass: Map<string, GameMonsterClass> = new Map<string, GameMonsterClass>();
  private _frequency: number;
  private _frequencyPop: Array<string>;

  static getInstance(): EntitiesFactory {
    if (!EntitiesFactory.instance) {
      EntitiesFactory.instance = new EntitiesFactory();
    }
    return EntitiesFactory.instance;
  }

  static createFromJson(jsonData: JsonEntity): Entity {
    return Monster.fromJSON(jsonData);
  }

  static generateRandomEntities(position: Position): Entity {
    return EntitiesFactory.getInstance()
                          .createEntity(EntityType.MONSTER, position);
  }

  constructor() {
    console.log('EntitiesFactory created');
    for (const key of Object.keys(gamemonster.default)) {
      this._monstersClass.set(gamemonster.default[key].id, new GameMonsterClass(gamemonster.default[key]));
    }
    this.setMaxPop(1);
  }

  createEntity(type: EntityType, position?: Position): Entity | undefined {
    switch (type) {
      case EntityType.PLAYER:
        return new Player(position);
      case EntityType.MONSTER:
        const monster: Monster = Monster.fromMonsterClass(this._getRandomMonsterClass());
        if (position) {
          monster.setPosition(position);
        }
        return monster;
      default:
        return undefined;
    }
  }

  setMaxPop(maxPop: number) {
    this._frequency = maxPop;
    this._frequencyPop = new Array<string>(maxPop);
    let maxFrequency = 0;
    let indexArray = 0;
    for (const [key, value] of this._monstersClass) {
      maxFrequency += value.frequency;
    }
    for (const [key, value] of this._monstersClass) {
      const r: number = Math.round((value.frequency * maxPop) / maxFrequency);
      this._frequencyPop = this._frequencyPop.fill(key, indexArray, r + indexArray);
      indexArray += r;
    }
  }

  private _getRandomMonsterClass(): GameMonsterClass {
    const className: string = this._frequencyPop[Utility.rolldice(this._frequencyPop.length - 1)];
    return this._monstersClass.get(className);
  }
}
