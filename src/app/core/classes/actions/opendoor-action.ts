import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {DoorTile} from '../tiles/door-tile';
import {EventLog} from '../event-log';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class OpendoorAction implements Iaction {
  private _info = '';

  constructor(private _tile: DoorTile) {
  }

  execute(subject: Entity, gameEngine: GameEngineService): ActionResult {
    EventLog.getInstance().message = 'You trying to open door';
    this._tile.flipDoor();
    subject.setNextAction(null);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
