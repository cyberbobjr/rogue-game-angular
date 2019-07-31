import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {DoorTile} from '../tiles/door-tile';
import {EventLog} from '../Utility/event-log';
import {GameEngine} from '../../../modules/game/services/game-engine.service';

export class OpenDoorAction implements Action {
  private _info = '';

  constructor(private _tile: DoorTile) {
  }

  execute(actor: Entity, gameEngine: GameEngine): ActionResult {
    EventLog.getInstance().message = 'You trying to open door';
    this._tile.flipDoor();
    actor.setNextAction(null);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
