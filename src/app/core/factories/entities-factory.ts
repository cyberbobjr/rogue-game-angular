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

  constructor() {
    console.log('EntitiesFactory created');
    for (const key of Object.keys(gamemonster.default)) {
      this._monstersClass.set(gamemonster.default[key].id, new GameMonsterClass(gamemonster.default[key]));
    }
  }

  createEntity(type: EntityType, position?: Position): Entity | null {
    switch (type) {
      case EntityType.PLAYER:
        return new Player(position);
      case EntityType.MONSTER:
        return Monster.fromMonsterClass(this._getRandomMonsterClass())
                      .setPosition(position);
      default:
        return null;
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

  generateRandomEntities(position: Position): Entity {
    return Monster.fromMonsterClass(this._getRandomMonsterClass())
                  .setPosition(position);
  }

  private _getRandomMonsterClass(): GameMonsterClass {
    const className: string = this._frequencyPop[Utility.rolldice(this._frequencyPop.length - 1)];
    return this._monstersClass.get(className);
  }
}
