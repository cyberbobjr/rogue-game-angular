import {Injectable} from '@angular/core';
import {IEntity} from '../interfaces/ientity';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  entities: Array<IEntity> = [];

  constructor() {
  }

  addEntity(actor: IEntity) {
    this.entities.push(actor);
  }
}
