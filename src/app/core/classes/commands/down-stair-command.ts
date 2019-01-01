import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class DownStairCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    gameEngine.gotoDownStair();
  }
}
