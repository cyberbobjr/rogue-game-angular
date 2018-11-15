import {Iaction} from '../interfaces/iaction';
import {IEntity} from '../interfaces/ientity';
import {RotMapEngine} from '../services/rot-map-engine.service';
import {Direction} from '../enums/direction.enum';
import {Position} from './position';

export class WalkAction implements Iaction {

  constructor(private _direction: Direction, private _mapEngine: RotMapEngine) {
  }

  perform(actor: IEntity): boolean {
    const {x, y} = actor.position.computeDestination(this._direction);
    const destPosition = new Position(x, y);
    if (this._mapEngine.isWalkable(destPosition)) {
      actor.position = destPosition;
      actor.setNextAction(null);
      return true;
    }
    actor.setNextAction(null);
    return false;
  }
}
