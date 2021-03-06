import {Entity} from '../base/entity';
import {GameEngine} from '../../../modules/game/services/game-engine.service';

export interface Command {
  execute(actor: Entity, gameEngine: GameEngine);
}
