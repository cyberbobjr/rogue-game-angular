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

  public setPlayer(player: Player) {
    this._player = player;
  }

  public getPlayer(): Player {
    return this._player;
  }

  public getEntities(): Array<Entity> {
    return this._entities;
  }

  public getAllEntities(): Array<Entity> {
    return this.getPlayer() ? this.getEntities()
                                  .concat(this.getPlayer()) : this.getEntities();
  }

  public setEntities(entities: Array<Entity>) {
    this._entities = entities;
  }

  public getEntityAt(position: Position): Entity | null {
    let monster: Entity = null;
    this.getAllEntities()
        .forEach((value: Entity, index: number) => {
          if (value.position.equal(position)) {
            monster = value;
          }
        });
    return monster;
  }

  public removeEntity(index: number): Array<Entity> {
    return this._entities
               .splice(index, 1);
  }

  public getEntitiesVisiblesOnMap(gameMap: GameMap): Array<Entity> {
    return this.getAllEntities()
               .filter((entity: Entity) => {
                 return gameMap.isPositionVisible(entity.getPosition());
               });
  }

}
