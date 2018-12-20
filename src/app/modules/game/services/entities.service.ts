import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Position} from '../../../core/classes/base/position';
import {MapEngine} from './map-engine.service';
import {Player} from '../../../core/classes/entities/player';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  private _entities: Array<Entity> = [];
  private _player: Player = null;

  get entities(): Entity[] {
    return this._entities;
  }

  set entities(value: Array<Entity>) {
    this._entities = value;
  }

  get player(): Player | null {
    return this._player;
  }

  set player(actor: Player) {
    this._player = actor;
    this._entities.unshift(this._player);
  }

  constructor() {
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

  getEntityAtIndex(index: number): Entity {
    return this.entities[index];
  }

  updateEntities(_mapEngine: MapEngine) {
    this._entities.forEach((entity: Entity, index: number) => {
      entity.update();
      if (entity.hp <= 0) {
        entity.onDead(_mapEngine);
        this._entities.splice(index, 1);
      }
    });
  }
}
