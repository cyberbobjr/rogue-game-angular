import {Iaction} from '../../interfaces/iaction';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {Entity} from '../base/entity';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {AttackMeleeAction} from './attack-melee-action';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class WalkAction implements Iaction {
  private _info = '';

  constructor(private _direction: Direction) {
  }

  execute(actor: Entity, gameEngine: GameEngineService): ActionResult {
    const destPosition: Position = actor.position.computeDestination(this._direction);
    const mapEngine: MapEngine = gameEngine.mapEngine;
    const tile: Tile = <Tile>mapEngine.getTileOrEntityAt(destPosition);
    if (tile instanceof Tile && tile.isWalkable()) {
      actor.position = destPosition;
      tile.onWalk(actor);
      actor.setNextAction(null);
      return ActionResult.SUCCESS;
    }
    const result = ActionResult.FAILURE;
    if (tile instanceof Entity) {
      EventLog.getInstance().message = 'You hit ' + tile.name;
      result.alternative = new AttackMeleeAction(tile as Entity);
      return result;
    }
    result.alternative = tile.onHit(actor);
    return result;
  }

  getInfo(): string {
    return this._info;
  }
}
