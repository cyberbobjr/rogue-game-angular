import {Position} from '../classes/position';
import {Iaction} from './iaction';

export interface IEntity {
  position: Position;
  name: string;
  character: string;

  getAction(): Iaction | null;

  setNextAction(action: Iaction);
}
