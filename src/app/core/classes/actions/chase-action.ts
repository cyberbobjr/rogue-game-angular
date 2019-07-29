import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {AttackMeleeAction} from './attack-melee-action';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Iobject} from '../../interfaces/iobject';
import {DoorTile} from '../tiles/door-tile';
import {Monster} from '../entities/monster';
import {IdleAction} from './idle-action';

export class ChaseAction implements Iaction {
  private _info = '';
  private _gameEngine: GameEngine = null;
  private _subject: Entity;

  set subject(value: Entity) {
    this._subject = value;
  }

  constructor() {
  }

  execute(gameEngine: GameEngine): ActionResult {
    if (!this._subject.sprite.light && (this._subject instanceof Monster)) {
      if ((this._subject as Monster).canFollowChase()) {
        this._subject.setNextAction(new IdleAction());
        return ActionResult.SUCCESS;
      }
    }
    this._gameEngine = gameEngine;
    EventLog.getInstance().message = `${this._subject.name} chasing`;
    const destPosition: Position = this._getPathToPlayer(this._subject);
    if (destPosition) {
      return this._moveActor(this._subject, destPosition);
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getPathToPlayer(actor: Entity): Position {
    const player: Player = this._gameEngine.getPlayer();
    return this._gameEngine.getMapEngine()
               .getDirectionFromPositionToPosition(actor.position, player.position);
  }

  private _moveActor(actor: Entity, destPosition: Position): ActionResult {
    const info: Entity | Tile = <Entity | Tile>this._gameEngine.getMapEngine()
                                                   .getTileOrEntityAt(destPosition);
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
    if (info instanceof DoorTile && (info as DoorTile).isClosed && (this._subject instanceof Monster)) {
      if ((this._subject as Monster).canOpenDoor()) {
        info.openDoor();
        EventLog.getInstance().message = `${actor.name} open the door !`;
      }
    }
    return ActionResult.SUCCESS;
  }
}
