import {IEntity} from './ientity';
import {ActionResult} from '../classes/actions/action-result';
import {MapEngine} from '../services/map-engine.service';

export interface Iaction {
  execute(actor: IEntity, mapEngine: MapEngine): ActionResult;

  getInfo(): string;
}
