import {ActionResult} from '../classes/actions/action-result';
import {MapEngine} from '../services/map-engine.service';
import {IObject} from './IObject';

export interface Iaction {
  execute(actor: IObject, mapEngine: MapEngine): ActionResult;

  getInfo(): string;
}
