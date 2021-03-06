import {Iaction} from '../../interfaces/iaction';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {AttackMeleeAction} from './attack-melee-action';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Monster} from '../entities/monster';

export class WalkAction implements Iaction {
  private _info = '';

  constructor(private _direction: Direction) {
  }

  execute(subject: Entity, gameEngine: GameEngine): ActionResult {
    const destPosition: Position = subject.position.computeDestination(this._direction);
    const tile: Tile = <Tile>gameEngine.getMapEngine()
                                       .getTileOrEntityAt(destPosition);
    if (tile instanceof Tile && tile.isWalkable()) {
      subject.position = destPosition;
      tile.onWalk(subject);
      subject.setNextAction(null);
      return ActionResult.SUCCESS;
    }
    const result = ActionResult.FAILURE;
    if (tile instanceof Monster) {
      EventLog.getInstance().message = `You hit ${tile.name}`;
      result.alternative = new AttackMeleeAction(tile as Monster);
      return result;
    }
    result.alternative = tile.onHit(subject);
    return result;
  }

  getInfo(): string {
    return this._info;
  }
}
