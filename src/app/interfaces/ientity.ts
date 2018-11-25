import {Position} from '../classes/position';
import {Iaction} from './iaction';
import {Tile} from '../classes/tile';

export interface IEntity {
  position: Position;
  name: string;
  character: Tile;

  getAction(): Iaction | null;

  setNextAction(action: Iaction);
}
