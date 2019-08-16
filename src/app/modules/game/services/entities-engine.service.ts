import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Player} from '../../../core/classes/entities/player';
import {GameEngineImp} from './game-engine-imp.service';
import {Action} from '../../../core/interfaces/action';
import {ActionResult} from '../../../core/classes/actions/action-result';
import {GameEntities} from '../../../core/classes/base/game-entities';
import {Position} from '../../../core/classes/base/position';
import {GameMap} from '../../../core/classes/base/game-map';
import {GameEngine} from '../../../core/interfaces/game-engine';

@Injectable({
  providedIn: 'root'
})
export class EntitiesEngine {
  private _gameEntities: GameEntities = new GameEntities();

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

  setEntities(entities: Array<Entity>): void {
    this._gameEntities.setEntities(entities);
  }

  updateEntities(gameEngine: GameEngine) {
    this.getAllEntities()
        .forEach((entity: Entity, index: number) => {
          entity.update();
          if (entity.hp <= 0) {
            entity.onDead(gameEngine);
            this._gameEntities.removeEntity(index);
            if (entity instanceof Player) {
              gameEngine.looseGame();
            }
          }
        });
  }

  executeEntitiesActions(gameEngine: GameEngineImp) {
    const entities: Array<Entity> = this.getAllEntities();
    for (let currentActorIndex = 0; currentActorIndex < entities.length; currentActorIndex++) {
      const currentActor: Entity = entities[currentActorIndex];
      let actorAction: Action = currentActor.getAction();
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

  getEntityAt(position: Position): Entity | undefined {
    return this._gameEntities.getEntityAt(position);
  }

  getEntitiesVisiblesOnMap(gameMap: GameMap) {
    return this._gameEntities.getEntitiesVisiblesOnMap(gameMap);
  }
}
