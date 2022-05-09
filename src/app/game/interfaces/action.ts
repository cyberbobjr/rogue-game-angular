import {ActionResult} from '../core/actions/action-result';
import {Entity} from '../core/base/entity';

export interface Action {
    execute(actor: Entity): ActionResult;

    getInfo(): string;
}
