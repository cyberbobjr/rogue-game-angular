import {Position} from '../classes/position';

export interface IEntity {
  position: Position;
  name: string;
  character: string;

  act();
}
