import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {GameMonsterClass} from '../base/game-monster-class';
import {JsonEntity, JsonGameObject, JsonMonster, JsonSprite} from '../../interfaces/json-interfaces';
import {Gold} from '../gameObjects/gold';
import {GameObject} from '../gameObjects/game-object';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Iaction} from '../../interfaces/iaction';
import {ChaseAction} from '../actions/chase-action';
import {IdleAction} from '../actions/idle-action';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {InventorySystem} from '../base/inventory-system';
import {EntityType} from '../../enums/entity-type.enum';

export class Monster extends Entity {
  private _frequency: number;

  get frequency(): number {
    return this._frequency;
  }

  set frequency(value: number) {
    this._frequency = value;
  }

  static fromJSON(jsonData: JsonEntity): Monster {
    const entity: Monster = new Monster();

    for (const key of Object.keys(jsonData)) {
      entity['_' + key] = jsonData[key];
    }
    entity._inventory = new InventorySystem();
    if (jsonData.sprite) {
      entity._sprite = new Sprite((jsonData.sprite as JsonSprite).character, (jsonData.sprite as JsonSprite).color);
    }

    if (jsonData.position) {
      entity._position = new Position(jsonData.position.x, jsonData.position.y);
    }

    if (jsonData.inventory.length > 0) {
      jsonData.inventory.forEach((value: JsonGameObject) => {
        const gameObject: GameObject = GameObjectFactory.createFromJson(value.objectType, value);
        gameObject.qty = value.qty;
        entity._inventory.addToInventory(gameObject);
      });
    }

    return entity;
  }

  static fromMonsterClass(monsterClass: GameMonsterClass): Monster {
    const monster: Monster = new Monster();
    monster.sprite = Sprite.fromJson(monsterClass.sprite);
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

  toJSON(): JsonMonster {
    return {
      ...super.toJSON(),
      ...{frequency: this._frequency}
    };
  }

  constructor() {
    super();
    this._entityType = EntityType.PLAYER;
  }

  setPosition(position: Position): Monster {
    this.position = position;
    return this;
  }

  // region events
  onDead(gameEngine: GameEngineService): void {
    // drop gold
    const goldObject: GameObject = new Gold(this.gp);
    const tile: Tile = gameEngine.getMapEngine()
                                 .getTileAt(this.position);
    tile.dropOn(goldObject);
    // drop weapon
    this._inventory.getAllGameObjects()
        .forEach((item: GameObject) => {
          tile.dropOn(item);
        });
    // region debug purpose
    tile.dropOn(GameObjectFactory.create(GameObjectType.POTION));
    // endregion
  }

  onHit(actor: Entity, damage: number) {
    const currentAction: Iaction = this.getAction();
    super.onHit(actor, damage);
    if (!currentAction || currentAction instanceof IdleAction) {
      this.setNextAction(new ChaseAction());
    }
  }

  // endregion

  canOpenDoor(): boolean {
    return (this.size === 'm');
  }

  canFollowChase(): boolean {
    return (this.size === 'm');
  }
}
