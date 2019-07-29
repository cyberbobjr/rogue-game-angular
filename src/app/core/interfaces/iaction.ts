import {ActionResult} from '../classes/actions/action-result';
import {Entity} from '../classes/base/entity';
import {GameEngine} from '../../modules/game/services/game-engine.service';

export interface Iaction {
  subject: Entity;

  execute(gameEngine: GameEngine): ActionResult;

  getInfo(): string;
}
