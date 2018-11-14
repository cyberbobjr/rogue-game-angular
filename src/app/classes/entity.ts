import {IEntity} from '../interfaces/ientity';
import {Position} from './position';
import {Injectable} from '@angular/core';

@Injectable({
              providedIn: 'root'
            })
export class Entity implements IEntity {
  position: Position;
  name: string;
  character: string;

  constructor(name: string, character: string, position?: Position) {
    this.name = name;
    this.character = character;
    if (position) {
      this.position = position;
    }
  }

  act() {
    console.log('act');
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}
