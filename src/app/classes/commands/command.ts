import {Entity} from '../base/entity';
import {GameEngineService} from '../../services/game-engine.service';

export interface Command {
  execute(actor: Entity, gameEngine: GameEngineService);
}
