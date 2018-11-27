import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {MapEngine} from '../../services/map-engine.service';
import {Tile} from '../base/tile';

export class OpendoorAction implements Iaction {
  private _info = '';
  private _alternate: Iaction = null;

  get alternate(): Iaction {
    return this._alternate;
  }

  set alternate(value: Iaction) {
    this._alternate = value;
  }

  constructor(tile: Tile) {
  }

  execute(actor: Entity, mapEngine: MapEngine): ActionResult {
    this._info = 'Open Door';
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
