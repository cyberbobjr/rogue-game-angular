import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {ChaseAction} from './chase-action';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Position} from '../base/position';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';

export class IdleAction implements Iaction {
  private _info = '';
  private _subject: Entity;

  set subject(value: Entity) {
    this._subject = value;
  }

  constructor() {
  }

  execute(gameEngine: GameEngine): ActionResult {
    if (this._subject.sprite.light) {
      EventLog.getInstance().message = 'Player in sight !';
      this._subject.setNextAction(new ChaseAction());
    } else {
      const destPosition: Position = this._getRandomPosition(this._subject);
      const tile: Tile = <Tile>gameEngine.getMapEngine()
                                         .getTileOrEntityAt(destPosition);
      if (tile instanceof Tile && tile.isWalkable()) {
        this._subject.position = destPosition;
        tile.onWalk(this._subject);
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
