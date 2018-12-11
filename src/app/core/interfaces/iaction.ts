import {ActionResult} from '../classes/actions/action-result';
import {MapEngine} from '../../modules/game/services/map-engine.service';
import {IObject} from './IObject';

export interface Iaction {
  execute(actor: IObject): ActionResult;

  getInfo(): string;
}
