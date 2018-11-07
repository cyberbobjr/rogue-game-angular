import {IEntity} from '../interfaces/ientity';
import {Position} from './position';

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
}
