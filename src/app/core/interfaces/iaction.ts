import {ActionResult} from '../classes/actions/action-result';
import {Entity} from '../classes/base/entity';

export interface Iaction {
  execute(actor: Entity): ActionResult;

  getInfo(): string;
}
