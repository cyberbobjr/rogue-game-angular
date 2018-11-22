import {Iaction} from '../interfaces/iaction';
import {IEntity} from '../interfaces/ientity';
import {MapEngine} from '../services/map-engine.service';
import {Direction} from '../enums/direction.enum';
import {Position} from './position';

export class WalkAction implements Iaction {
  private _info = '';

  constructor(private _direction: Direction,
              private _mapEngine: MapEngine) {
  }

  perform(actor: IEntity): boolean {
    const destPosition = actor.position.computeDestination(this._direction);
    if (this._mapEngine.isWalkable(destPosition)) {
      actor.position = destPosition;
      actor.setNextAction(null);
      this._info = 'Move';
      return true;
    }
    this._info = 'You can\'t walk !';
    actor.setNextAction(null);
    return false;
  }

  getInfo(): string {
    return this._info;
  }
}
