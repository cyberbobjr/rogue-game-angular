import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {AttackMeleeAction} from './attack-melee-action';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Iobject} from '../../interfaces/iobject';
import {DoorTile} from '../tiles/door-tile';
import {Monster} from '../entities/monster';
import {IdleAction} from './idle-action';
import {GameMap} from '../base/game-map';
import {MapEngine} from '../../../modules/game/services/map-engine.service';

export class ChaseAction implements Action {
  private _info = 'Chase Action';
  private _mapEngine: MapEngine = null;

  constructor(private _target: Entity) {
  }

  execute(actor: Entity, gameEngine: GameEngine): ActionResult {
    this._mapEngine = gameEngine.getMapEngine();
    if (!actor.sprite.light && (actor instanceof Monster)) {
      if ((actor as Monster).canFollowChase()) {
        actor.setNextAction(new IdleAction());
        return ActionResult.SUCCESS;
      }
    }
    EventLog.getInstance().message = `${actor.name} chasing`;
    const destPosition: Position = this._getNextPositionToPlayer(actor);
    if (destPosition) {
      return this._moveActor(actor, destPosition);
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getNextPositionToPlayer(actor: Entity): Position {
    return this._mapEngine.getNextPosition(actor.position, this._target.position);
  }

  private _moveActor(actor: Entity, destPosition: Position): ActionResult {
    const info: Entity | Tile = <Entity | Tile>this._mapEngine.getTileOrEntityAt(destPosition);
    if (info instanceof Player) {
      const result = ActionResult.FAILURE;
      result.alternative = new AttackMeleeAction(info as Entity);
      return result;
    }
    if (info instanceof Tile && info.isWalkable()) {
      info.onWalk(actor);
      actor.position = destPosition;
      return ActionResult.SUCCESS;
    }
    if (info instanceof DoorTile && (info as DoorTile).isClosed && (actor instanceof Monster)) {
      if ((actor as Monster).canOpenDoor()) {
        info.openDoor();
        EventLog.getInstance().message = `${actor.name} open the door !`;
      }
    }
    return ActionResult.SUCCESS;
  }
}
