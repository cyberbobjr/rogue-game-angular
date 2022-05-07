import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {GameMonsterClass} from '../base/game-monster-class';
import {JsonMonster} from '../../interfaces/json-interfaces';
import {Gold} from '../gameObjects/gold';
import {GameObject} from '../gameObjects/game-object';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Action} from '../../interfaces/action';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameEngineService} from '../../../services/game-engine-imp.service';
import {EntityType} from '../../enums/entity-type.enum';

export class Monster extends Entity {
  private _frequency: number;

  get frequency(): number {
    return this._frequency;
  }

  set frequency(value: number) {
    this._frequency = value;
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
    this._entityType = EntityType.MONSTER;
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

  onHit(damage: number): void {
    const currentAction: Action = this.getAction();
    super.onHit(damage);
    /*    if (!currentAction || currentAction instanceof IdleAction) {
     this.setNextAction(new ChaseAction());
     }*/
  }

  // endregion

  canOpenDoor(): boolean {
    return (this.size === 'm');
  }

  canFollowChase(): boolean {
    return (this.size === 'm');
  }
}
