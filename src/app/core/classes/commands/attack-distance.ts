import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {AttackDistanceAction} from '../actions/attack-distance-action';

export class AttackDistance implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new AttackDistanceAction(actor, gameEngine.mapEngine, gameEngine));
  }
}
