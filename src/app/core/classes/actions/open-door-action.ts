import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {DoorTile} from '../tiles/door-tile';
import {EventLog} from '../Utility/event-log';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';

export class OpenDoorAction implements Action {
  private _info = '';

  constructor(private _tile: DoorTile) {
  }

  execute(actor: Entity, gameEngine: GameEngineImp): ActionResult {
    EventLog.getInstance().message = 'You trying to open door';
    this._tile.flipDoor();
    actor.setNextAction(null);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
