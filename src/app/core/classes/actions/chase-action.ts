import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {AttackMeleeAction} from './attack-melee-action';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {DoorTile} from '../tiles/door-tile';
import {Monster} from '../entities/monster';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {IdleAction} from './idle-action';
import {GameEngine} from '../../interfaces/game-engine';

export class ChaseAction implements Action {
  private _info = 'Chase Action';
  private _mapEngine: MapEngine = null;
  private _gameEngine: GameEngine;

  constructor(private _target: Entity) {
  }

  execute(actor: Entity, gameEngine: GameEngineImp): ActionResult {
    this._mapEngine = gameEngine.getMapEngine();
    this._gameEngine = gameEngine;
    if (!actor.sprite.light && (actor instanceof Monster)) {
      if ((actor as Monster).canFollowChase()) {
        actor.setNextAction(new IdleAction());
        return ActionResult.SUCCESS;
      }
    }
    EventLog.getInstance().message = `${actor.name} chasing`;
    const destPosition: Position = this._mapEngine.getNextPosition(actor.position, this._target.position);
    if (destPosition) {
      return this._moveActor(actor, destPosition);
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _moveActor(actor: Entity, destPosition: Position): ActionResult {
    const info: Entity | Tile = <Entity | Tile>this._gameEngine.getTileOrEntityAt(destPosition);
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
