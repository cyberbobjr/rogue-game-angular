import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Position} from '../../../core/classes/base/position';
import {Player} from '../../../core/classes/entities/player';
import {GameEngineService} from './game-engine.service';
import {JsonEntity, JsonMap} from '../../../core/interfaces/json-interfaces';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {IdleAction} from '../../../core/classes/actions/idle-action';
import {GameMap} from '../../../core/classes/base/game-map';
import {Iaction} from '../../../core/interfaces/iaction';
import {ActionResult} from '../../../core/classes/actions/action-result';
import {MapEngine} from './map-engine.service';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  private _player: Player = null;
  private _entities: Array<Entity> = [];

  static convertRawEntitiesToEntities(jsonEntities: Array<JsonEntity>): Array<Entity> {
    if (jsonEntities.length > 0) {
      const entities: Array<Entity> = [];
      jsonEntities.forEach((jsonEntity: JsonEntity) => {
        entities.push(EntitiesFactory.createFromJson(jsonEntity)
                                     .setNextAction(new IdleAction()));
      });
      return entities;
    }
    return [];
  }

  constructor() {
  }

  setPlayer(actor: Player) {
    this._player = actor;
  }

  getPlayer(): Player {
    return this._player;
  }

  getEntities(): Array<Entity> {
    return this._entities;
  }

  setEntities(entities: Array<Entity>) {
    this._entities = entities;
  }

  getAllEntities(): Array<Entity> {
    return this.getEntities()
               .concat(this.getPlayer());
  }

  getEntityAt(position: Position): Entity | null {
    let monster: Entity = null;
    this.getAllEntities()
        .forEach((value: Entity, index: number) => {
          if (value.position.equal(position)) {
            monster = value;
          }
        });
    return monster;
  }

  updateEntities(gameEngine: GameEngineService) {
    this.getAllEntities()
        .forEach((entity: Entity, index: number) => {
          entity.update();
          if (entity.hp <= 0) {
            entity.onDead(gameEngine);
            this._entities
                .splice(index, 1);
            if (entity instanceof Player) {
              gameEngine.gameOver();
            }
          }
        });
  }

  processAction(gameEngine: GameEngineService) {
    const entities: Array<Entity> = this.getAllEntities();
    for (let currentActorIndex = 0; currentActorIndex < entities.length; currentActorIndex++) {
      const currentActor: Entity = entities[currentActorIndex];
      let actorAction: Iaction = currentActor.getAction();
      if (actorAction) {
        while (true) {
          const resultAction: ActionResult = actorAction.execute(currentActor, gameEngine);
          if (resultAction.succeeded) {
            break;
          }
          if (!resultAction.alternative) {
            return;
          }
          actorAction = Object.create(resultAction.alternative);
          resultAction.alternative = null;
        }
      }
    }
  }

  drawEntities(gameMap: GameMap) {
    this.getEntities()
        .concat(this.getPlayer())
        .forEach((entity: Entity) => {
          gameMap.setDataAt(entity.position.x, entity.position.y, entity);
        });
    return this;
  }
}
