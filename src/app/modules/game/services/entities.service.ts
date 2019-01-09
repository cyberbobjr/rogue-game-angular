import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Position} from '../../../core/classes/base/position';
import {Player} from '../../../core/classes/entities/player';
import {GameEngineService} from './game-engine.service';
import {JsonEntity} from '../../../core/interfaces/json-interfaces';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {IdleAction} from '../../../core/classes/actions/idle-action';

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

  get player(): Player | null {
    return this._player;
  }

  set player(actor: Player) {
    this._player = actor;
  }

  constructor() {
  }

  getEntities(): Array<Entity> {
    return this._entities.concat(this.player);
  }

  getEntitiesVisibles(): Array<Entity> {
    return this._entitiesVisibles;
  }

  loadEntitiesFromJson(jsonEntities: Array<JsonEntity>) {
    this._entities.slice(0);
    jsonEntities.forEach((entity: JsonEntity) => {
      const actor: Entity = EntitiesFactory.createFromJson(entity);
      actor.setNextAction(new IdleAction(actor));
      this._entities.push(actor);
    });
  }

  getEntityAt(position: Position): Entity | null {
    let monster: Entity = null;
    this._entities.forEach((value: Entity, index: number) => {
      if (value.position.equal(position)) {
        monster = value;
      }
    });
    return monster;
  }

  updateEntities(_gameEngine: GameEngineService) {
    /*this._entities.forEach((entity: Entity, index: number) => {
     entity.update();
     if (entity.hp <= 0) {
     entity.onDead(_gameEngine);
     this._entities.splice(index, 1);
     if (entity instanceof Player) {
     alert('You die !');
     this.player = null;
     }
     }
     });*/
  }
}
