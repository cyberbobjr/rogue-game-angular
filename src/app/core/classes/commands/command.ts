import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export interface Command {
  execute(actor: Entity, gameEngine: GameEngineService);
}
