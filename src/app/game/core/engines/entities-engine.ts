import {Entity} from '@core/core/base/entity';
import {Player} from '@core/core/entities/player';
import {Action} from '@core/interfaces/action';
import {ActionResult} from '@core/core/actions/action-result';
import {GameEntities} from '@core/core/base/game-entities';
import {Position2D} from '@core/core/base/position2D';
import {GameEngine} from '@core/core/engines/GameEngine';
import {GameMap} from '@core/interfaces/GameMap';

export class EntitiesEngine {
    private _gameEntities: GameEntities = new GameEntities();

    constructor() {
    }

    setPlayer(actor: Player) {
        this._gameEntities.setPlayer(actor);
    }

    getPlayer(): Player {
        return this._gameEntities.getPlayer();
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

    executeEntitiesActions() {
        const entities: Array<Entity> = this.getAllEntities();
        for (let currentActorIndex = 0; currentActorIndex < entities.length; currentActorIndex++) {
            const currentActor: Entity = entities[currentActorIndex];
            let actorAction: Action = currentActor.getAction();
            if (actorAction) {
                while (true) {
                    const resultAction: ActionResult = actorAction.execute(currentActor);
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

    getEntityAt(position: Position2D): Entity | undefined {
        return this._gameEntities.getEntityAtPosition(position);
    }

    getEntitiesVisiblesOnMap(gameMap: GameMap) {
        return this._gameEntities.getEntitiesVisiblesOnMap(gameMap);
    }

    setVisibilityForEntities(gameMap: GameMap) {
        this.getGameEntities().getEntities().forEach(entity => {
            entity.sprite.light = gameMap.getLosForPosition(entity.position) > 0;
        });
    }
}
