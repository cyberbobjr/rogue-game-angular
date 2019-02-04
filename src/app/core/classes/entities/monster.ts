import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {GameMonsterClass} from '../base/game-monster-class';
import {JsonEntity, JsonGameObject} from '../../interfaces/json-interfaces';
import {Gold} from '../gameObjects/gold';
import {GameObject} from '../gameObjects/game-object';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Iaction} from '../../interfaces/iaction';
import {ChaseAction} from '../actions/chase-action';
import {IdleAction} from '../actions/idle-action';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class Monster extends Entity {
  static fromJSON(jsonData: JsonEntity): Monster {
    let monster: Monster = new this();
    monster = Object.assign(monster, jsonData, {
      _position: new Position(jsonData.position.x, jsonData.position.y),
      _sprite: new Sprite(jsonData.sprite.character, jsonData.sprite.color)
    });

    if (jsonData.inventory.length > 0) {
      jsonData.inventory.forEach((value: JsonGameObject) => {
        const letterInventory = monster.addToInventory(GameObjectFactory.createFromJson(value.objectType, value));
        monster.equipInventory(letterInventory);
      });
    }

    return monster;
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
      this.setNextAction(new ChaseAction(this as Entity));
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
