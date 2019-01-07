import {Iaction} from '../../interfaces/iaction';
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
import {GameMap} from '../base/gameMap';

export class ChaseAction implements Iaction {
  private _info = '';
  private _gameEngine: GameEngineService = null;

  constructor(private _subject: Entity) {
  }

  execute(subject: Entity, gameEngine: GameEngineService): ActionResult {
    if (!subject.sprite.light && !(subject as Monster).canFollowChase()) {
      subject.setNextAction(new IdleAction(this._subject));
      return ActionResult.SUCCESS;
    }
    this._gameEngine = gameEngine;
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
    const player: Player = this._gameEngine.getPlayer();
    return this._gameEngine.getCurrentMap()
               .getDirectionFromPositionToPosition(actor.position, player.position);
  }

  private _moveActor(destPosition: Position): ActionResult {
    const gameMap: GameMap<Iobject> = this._gameEngine.getCurrentMap();
    const info: Iobject = gameMap.getTileOrEntityAt(destPosition);
    if (info instanceof Player) {
      const result = ActionResult.FAILURE;
      result.alternative = new AttackMeleeAction(info as Entity);
      return result;
    }
    if (info instanceof Tile && info.isWalkable()) {
      info.onWalk(this._subject);
      this._subject.position = destPosition;
      return ActionResult.SUCCESS;
    }
    if (info instanceof DoorTile && (info as DoorTile).isClosed && (this._subject as Monster).canOpenDoor()) {
      info.openDoor();
      EventLog.getInstance().message = `${this._subject.name} open the door !`;
    }
    return ActionResult.SUCCESS;
  }
}
