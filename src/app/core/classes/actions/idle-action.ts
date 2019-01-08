import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {ChaseAction} from './chase-action';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Position} from '../base/position';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {Monster} from '../entities/monster';

export class IdleAction implements Iaction {
  private _info = '';

  constructor(private _actor: Entity) {
  }

  execute(subject: Entity, gameEngine: GameEngineService): ActionResult {
    if (subject.sprite.light) {
      EventLog.getInstance().message = 'Player in sight !';
      subject.setNextAction(new ChaseAction(subject as Monster));
    } else {
      const direction: Direction = this._getRandomDirection();
      const destPosition: Position = subject.position.computeDestination(direction);
      const tile: Tile = <Tile>gameEngine.getMapEngine()
                                         .getTileOrEntityAt(destPosition);
      if (tile instanceof Tile && tile.isWalkable()) {
        subject.position = destPosition;
        tile.onWalk(subject);
      }
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getRandomDirection(): Direction {
    return Direction.getRandom();
  }
}
