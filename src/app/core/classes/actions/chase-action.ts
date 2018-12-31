import {Iaction} from '../../interfaces/iaction';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {AttackMeleeAction} from './attack-melee-action';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Iobject} from '../../interfaces/iobject';
import {DoorTile} from '../tiles/door-tile';
import {Monster} from '../entities/monster';
import {IdleAction} from './idle-action';

export class ChaseAction implements Iaction {
  private _info = '';
  private _mapEngine: MapEngine = null;

  constructor(private _subject: Monster) {
  }

  execute(subject: Monster, gameEngine: GameEngineService): ActionResult {
    if (!subject.sprite.light && !subject.canFollowChase()) {
      return this.cancelChasing();
    }
    this._mapEngine = gameEngine.mapEngine;
    EventLog.getInstance().message = `${this._subject.name} chasing`;
    const destPosition: Position = this._getPathToPlayer(subject);
    if (destPosition) {
      return this._moveActor(destPosition);
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getPathToPlayer(actor: Entity): Position {
    return this._mapEngine.getDirectionToPlayer(actor.position);
  }

  private _moveActor(destPosition: Position): ActionResult {
    const info: Iobject = this._mapEngine.getTileOrEntityAt(destPosition);
    if (info instanceof Player) {
      const result = ActionResult.FAILURE;
      result.alternative = new AttackMeleeAction(info);
      return result;
    }
    if (info instanceof Tile && info.isWalkable()) {
      info.onWalk(this._subject);
      this._subject.position = destPosition;
    }
    if (info instanceof DoorTile && (info as DoorTile).isClosed && this._subject.canOpenDoor()) {
      info.openDoor();
      EventLog.getInstance().message = `${this._subject.name} open the door !`;
    }
    return ActionResult.SUCCESS;
  }

  private cancelChasing(): ActionResult {
    const result = ActionResult.FAILURE;
    result.alternative = new IdleAction(this._subject);
    return result;
  }
}
