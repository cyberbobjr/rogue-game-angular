import {IEntity} from '../interfaces/ientity';
import {Position} from './position';
import {Injectable} from '@angular/core';
import {Iaction} from '../interfaces/iaction';

@Injectable({
              providedIn: 'root'
            })
export class Entity implements IEntity {
  position: Position;
  name: string;
  character: string;
  _currentAction: Iaction = null;

  constructor(name: string, character: string, position?: Position) {
    this.name = name;
    this.character = character;
    if (position) {
      this.position = position;
    }
  }

  getAction(): Iaction | null {
    return (this._currentAction) ? this._currentAction : null;
  }

  setNextAction(action: Iaction) {
    this._currentAction = action;
  }
}
