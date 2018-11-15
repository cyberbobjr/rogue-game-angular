import {Iaction} from '../interfaces/iaction';
import {IEntity} from '../interfaces/ientity';
import {RotMapEngine} from '../services/rot-map-engine.service';
import {Direction} from '../enums/direction.enum';
import {Position} from './position';

export class WalkAction implements Iaction {

  constructor(private _direction: Direction, private _engine: RotMapEngine) {
  }

  perform(actor: IEntity): boolean {
    const {x, y} = actor.position.computeDestination(this._direction);
    actor.position = new Position(x, y);
    /*if (this._engine.isWalkable(destination)) {

     }*/
    actor.setNextAction(null);
    return true;
  }

}

