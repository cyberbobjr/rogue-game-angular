import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {ChaseAction} from './chase-action';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Position} from '../base/position';
import {Direction} from '../../enums/direction.enum';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Tile} from '../base/tile';
import {Utility} from '../utility';

export class IdleAction implements Iaction {
  private _info = '';

  constructor(private _actor: Entity) {
  }

  execute(actor: Entity, gameEngine: GameEngineService): ActionResult {
    if (actor.sprite.light) {
      EventLog.getInstance().message = 'Player in sight !';
      actor.setNextAction(new ChaseAction(actor));
    } else {
      const direction: Direction = this._getRandomDirection();
      const destPosition: Position = actor.position.computeDestination(direction);
      const mapEngine: MapEngine = gameEngine.mapEngine;
      const tile: Tile = <Tile>mapEngine.getTileOrEntityAt(destPosition);
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

  private _getRandomDirection(): Direction {
    return Direction.getRandom();
  }
}
