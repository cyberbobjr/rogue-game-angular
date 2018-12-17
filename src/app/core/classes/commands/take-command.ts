import {Command} from './command';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {TakeAction} from '../actions/take-action';

export class TakeCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new TakeAction(actor, gameEngine.mapEngine));
  }
}
