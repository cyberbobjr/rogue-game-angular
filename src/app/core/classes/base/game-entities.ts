import {Entity} from './entity';
import {JsonEntity} from '../../interfaces/json-interfaces';
import {EntitiesFactory} from '../../factories/entities-factory';
import {IdleAction} from '../actions/idle-action';
import {GameMap} from './game-map';
import {Position} from './position';
import {Player} from '../entities/player';

export class GameEntities {
  private _entities: Array<Entity> = [];
  private _player: Player = null;

  static convertRawEntitiesToGameEntities(jsonEntities: Array<JsonEntity>): GameEntities {
    const gameEntities: GameEntities = new GameEntities();
    if (jsonEntities.length > 0) {
      const entities: Array<Entity> = [];
      jsonEntities.forEach((jsonEntity: JsonEntity) => {
        entities.push(EntitiesFactory.createFromJson(jsonEntity)
                                     .setNextAction(new IdleAction()));
      });
      gameEntities.setEntities(entities);
    }
    return gameEntities;
  }

  getEntities(): Array<Entity> {
    return this._entities;
  }

  getAllEntities(): Array<Entity> {
    return this.getPlayer() ? this.getEntities()
                                  .concat(this.getPlayer()) : this.getEntities();
  }

  setPlayer(actor: Player) {
    this._player = actor;
  }

  getPlayer(): Player {
    return this._player;
  }

  setEntities(entities: Array<Entity>) {
    this._entities = entities;
  }

  getEntitiesVisibles(gameMap: GameMap): Array<Entity> {
    return this.getEntities()
               .filter((entity: Entity) => {
                 const entityPosition: Position = entity.getPosition();
                 return gameMap.getLosForPosition(entityPosition) > 0;
               });
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

  removeEntity(index: number): Array<Entity> {
    return this._entities
               .splice(index, 1);
  }
}
