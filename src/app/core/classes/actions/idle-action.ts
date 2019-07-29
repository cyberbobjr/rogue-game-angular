import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {ChaseAction} from './chase-action';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Position} from '../base/position';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';

export class IdleAction implements Action {
  private _info = '';

  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngine): ActionResult {
    if (actor.sprite.light) {
      EventLog.getInstance().message = 'Player in sight !';
      actor.setNextAction(new ChaseAction());
    } else {
      const destPosition: Position = this._getRandomPosition(actor);
      const tile: Tile = <Tile>gameEngine.getMapEngine()
                                         .getTileOrEntityAt(destPosition);
      if (tile instanceof Tile && tile.isWalkable()) {
        actor.position = destPosition;
        tile.onWalk(actor);
      }
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getRandomPosition(subject: Entity): Position {
    const direction: Direction = this._getRandomDirection();
    return subject.position.computeDestination(direction);
  }

  private _getRandomDirection(): Direction {
    return Direction.getRandom();
  }
}
