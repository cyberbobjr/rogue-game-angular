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
  private _subject: Entity;

  set subject(value: Entity) {
    this._subject = value;
  }

  constructor(private _direction: Direction) {
  }

  /**
   * TODO : refactor to FSM
   * @param gameEngine GameEngine
   */
  execute(gameEngine: GameEngine): ActionResult {
    const destPosition: Position = this._subject.position.computeDestination(this._direction);
    const tile: Tile | Entity = <Tile | Entity>gameEngine.getMapEngine()
                                                         .getTileOrEntityAt(destPosition);
    if (tile instanceof Tile && tile.isWalkable()) {
      tile.onWalk(this._subject);
      this._subject.position = destPosition;
      this._subject.setNextAction(null);
      return ActionResult.SUCCESS;
    }
    const result = ActionResult.FAILURE;
    if (tile instanceof Monster) {
      EventLog.getInstance().message = `You hit ${tile.name}`;
      result.alternative = new AttackMeleeAction(tile as Entity);
      return result;
    }
    if (tile instanceof Tile) {
      result.alternative = tile.onHit(this._subject as Entity);
      return result;
    }
    if (tile instanceof Entity) {
      this._subject.setNextAction(null);
      return ActionResult.SUCCESS;
    }
  }

  getInfo(): string {
    return this._info;
  }
}
