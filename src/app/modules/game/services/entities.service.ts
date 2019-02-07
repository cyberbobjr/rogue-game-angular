import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Position} from '../../../core/classes/base/position';
import {Player} from '../../../core/classes/entities/player';
import {GameEngineService} from './game-engine.service';
import {JsonEntity} from '../../../core/interfaces/json-interfaces';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {IdleAction} from '../../../core/classes/actions/idle-action';
import {GameMap} from '../../../core/classes/base/game-map';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  private _player: Player = null;
  private _entities: Array<Entity> = [];
  private _entitiesVisibles: Array<Entity> = [];

  set entities(value: Array<Entity>) {
    this._entities = value;
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

  getEntitiesVisibles(): Array<Entity> {
    return this._entitiesVisibles;
  }

  getAllEntities(): Array<Entity> {
    return this.getEntities()
               .concat(this.getPlayer());
  }

  loadEntitiesFromGameMap(gameMap: GameMap) {

  }

  loadEntitiesFromJson(jsonEntities: Array<JsonEntity>) {
    this._entities.splice(0);
    jsonEntities.forEach((entity: JsonEntity) => {
      const actor: Entity = EntitiesFactory.createFromJson(entity);
      actor.setNextAction(new IdleAction());
      this._entities.push(actor);
    });
  }

  getEntityAt(position: Position): Entity | null {
    let monster: Entity = null;
    this._entities.concat(this.getPlayer())
        .forEach((value: Entity, index: number) => {
          if (value.position.equal(position)) {
            monster = value;
          }
        });
    return monster;
  }

  updateEntities(_gameEngine: GameEngineService) {
    this._entities.concat(this.getPlayer())
        .forEach((entity: Entity, index: number) => {
          entity.update();
          if (entity.hp <= 0) {
            entity.onDead(_gameEngine);
            this._entities.splice(index, 1);
            if (entity instanceof Player) {
              _gameEngine.gameOver();
            }
          }
        });
  }
}
