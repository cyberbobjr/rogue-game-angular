import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';
import {Monster} from '../classes/entities/monster';
import {Position} from '../classes/base/position';
import {JsonEntity, JsonGameObject, JsonSprite} from '../interfaces/json-interfaces';
import {GameMonsterClass} from '../classes/base/game-monster-class';
import * as gamemonster from '../rules/race/monster.json';
import {Utility} from '../classes/Utility/utility';
import {AttributeSystem} from '../classes/base/AttributeSystem';
import {InventorySystem} from '../classes/base/inventory-system';
import {Sprite} from '../classes/base/sprite';
import {GameObject} from '../classes/gameObjects/game-object';
import {GameObjectFactory} from './game-object-factory';
import {SlotType} from '../enums/equiped-type.enum';
import {GameMap} from '../classes/base/game-map';
import {Room} from 'rot-js/lib/map/features';
import {IdleAction} from '../classes/actions/idle-action';

export class EntitiesFactory {

  constructor() {
    console.log('EntitiesFactory created');
    for (const key of Object.keys(gamemonster.default)) {
      this._monstersClass.set(gamemonster.default[key].id, new GameMonsterClass(gamemonster.default[key]));
    }
    this.setMaxPop(1);
  }

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

  static generateRandomEntities(position: Position): Entity {
    return EntitiesFactory.getInstance()
                          .createEntity(EntityType.MONSTER, position);
  }

  createEntityFromJson(jsonData: JsonEntity): Player | Monster {
    switch (jsonData.entityType) {
      case EntityType.MONSTER:
        return this._setEntityProperties<Monster>(new Monster(), jsonData);
      case EntityType.PLAYER:
        return this._setEntityProperties<Player>(new Player(), jsonData);
    }
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

  private _setEntityProperties<T>(entity: T & Entity, jsonData: JsonEntity): T {
    entity.id = jsonData.id;
    entity.name = jsonData.name;
    entity.hp = jsonData.hp;
    entity.ac = jsonData.ac;
    entity.gp = jsonData.gp;
    entity.speed = jsonData.speed;
    entity.size = jsonData.size;
    entity.race = jsonData.race;

    entity.setAttributes(new AttributeSystem(jsonData.abilities));
    if (jsonData.sprite) {
      entity.sprite = new Sprite((jsonData.sprite as JsonSprite).character, (jsonData.sprite as JsonSprite).color);
    }

    if (jsonData.position) {
      entity.position = new Position(jsonData.position.x, jsonData.position.y);
    }

    entity.inventory = new InventorySystem();
    if (jsonData.inventory.length > 0) {
      jsonData.inventory.forEach((value: JsonGameObject) => {
        const gameObject: GameObject = GameObjectFactory.createFromJson(value.objectType, value);
        gameObject.qty = value.qty;
        entity.addToInventory(gameObject);
      });
    }

    if (jsonData.equipped) {
      jsonData.equipped.forEach((value: [SlotType, string]) => {
        const gameObject: GameObject = entity.getItemByLetter(value[1]);
        entity.inventory.equipItemAtSlot(value[0], value[1]);
        gameObject.onEquip(entity, value[1]);
      });
    }

    if (entity instanceof Player) {
      entity.gameClass = jsonData.gameClass;
      entity.hitDice = jsonData.hitDice;
      entity.maxHp = jsonData.maxHp;
      entity.mapLevel = jsonData.mapLevel;
    }
    return entity;
  }
}
