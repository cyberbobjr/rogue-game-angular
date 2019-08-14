import {ActionResult} from '../classes/actions/action-result';
import {Entity} from '../classes/base/entity';
import {GameEngineImp} from '../../modules/game/services/game-engine-imp.service';

export interface Action {
  execute(actor: Entity, gameEngine: GameEngineImp): ActionResult;

  getInfo(): string;
}
