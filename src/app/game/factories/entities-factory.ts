import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../core/entities/player';
import {Entity} from '../core/base/entity';
import {Monster} from '../core/entities/monster';
import {Position2D} from '../core/base/position2D';
import {JsonEntity, JsonGameObject, JsonSprite} from '../interfaces/json-interfaces';
import {GameMonsterClass} from '../core/base/game-monster-class';
import {Utility} from '../core/Utility/utility';
import {AttributeSystem} from '../core/base/AttributeSystem';
import {InventorySystem} from '../core/base/inventory-system';
import {Sprite} from '../core/base/sprite';
import {GameObject} from '../core/gameObjects/game-object';
import {GameObjectFactory} from './game-object-factory';
import {SlotType} from '../enums/equiped-type.enum';
import * as GameMonsterJsonData from '../data/race/monster.json';
import {plainToInstance} from 'class-transformer';

export class EntitiesFactory {
    private static instance: EntitiesFactory;
    private _monstersClass: Map<string, GameMonsterClass> = new Map<string, GameMonsterClass>();
    private _frequency: number;
    private _frequencyPop: Array<string>;

    constructor() {
        console.log('EntitiesFactory created');
        for (const monster of Object.assign([], GameMonsterJsonData)) {
            this._monstersClass.set(monster.id, plainToInstance(GameMonsterClass, monster));
        }
        this.setMaxPop(1);
    }

    static getInstance(): EntitiesFactory {
        if (!EntitiesFactory.instance) {
            EntitiesFactory.instance = new EntitiesFactory();
        }
        return EntitiesFactory.instance;
    }

    static generateRandomEntities(position: Position2D): Entity {
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

    createEntity(type: EntityType, position?: Position2D): Entity | undefined {
        switch (type) {
            case EntityType.PLAYER:
                return new Player(position);
            case EntityType.MONSTER:
                const randomMonsterClass: GameMonsterClass = this._getRandomMonsterClass();
                const monster: Monster = Monster.fromMonsterClass(randomMonsterClass);
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
            entity.position = new Position2D(jsonData.position.x, jsonData.position.y);
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
            entity.level = jsonData.level;
        }
        return entity;
    }
}
