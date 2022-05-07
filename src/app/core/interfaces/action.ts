import {ActionResult} from '../classes/actions/action-result';
import {Entity} from '../classes/base/entity';
import {GameEngineService} from '../../services/game-engine-imp.service';

export interface Action {
  execute(actor: Entity, gameEngine: GameEngineService): ActionResult;
  getInfo(): string;
}
