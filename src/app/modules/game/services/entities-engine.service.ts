import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Position} from '../../../core/classes/base/position';
import {Player} from '../../../core/classes/entities/player';
import {GameEngine} from './game-engine.service';
import {JsonEntity, JsonMap} from '../../../core/interfaces/json-interfaces';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {IdleAction} from '../../../core/classes/actions/idle-action';
import {GameMap} from '../../../core/classes/base/game-map';
import {Iaction} from '../../../core/interfaces/iaction';
import {ActionResult} from '../../../core/classes/actions/action-result';
import {MapEngine} from './map-engine.service';
import {GameEntities} from '../../../core/classes/base/game-entities';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesEngine {
  private _gameEntities: GameEntities;

  constructor() {
  }

  setPlayer(actor: Player) {
    this._gameEntities.setPlayer(actor);
  }

  getPlayer(): Player | undefined {
    return this._gameEntities ? this._gameEntities.getPlayer() : undefined;
  }

  setGameEntities(gameEntities: GameEntities) {
    this._gameEntities = gameEntities;
  }

  getGameEntities(): GameEntities {
    return this._gameEntities;
  }

  getAllEntities(): Array<Entity> {
    return this._gameEntities.getAllEntities();
  }

  updateEntities(gameEngine: GameEngine) {
    this.getAllEntities()
        .forEach((entity: Entity, index: number) => {
          entity.update();
          if (entity.hp <= 0) {
            entity.onDead(gameEngine);
            this._gameEntities.removeEntity(index);
            if (entity instanceof Player) {
              gameEngine.gameOver();
            }
          }
        });
  }

  executeEntitiesActions(gameEngine: GameEngine) {
    const entities: Array<Entity> = this.getAllEntities();
    for (let currentActorIndex = 0; currentActorIndex < entities.length; currentActorIndex++) {
      const currentActor: Entity = entities[currentActorIndex];
      let actorAction: Iaction = currentActor.getAction();
      if (actorAction) {
        while (true) {
          const resultAction: ActionResult = actorAction.execute(gameEngine);
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
}
