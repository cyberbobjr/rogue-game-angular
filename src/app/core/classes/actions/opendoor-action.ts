import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {DoorTile} from '../tiles/door-tile';
import {EventLog} from '../event-log';

export class OpendoorAction implements Iaction {
  private _info = '';

  constructor(private _tile: DoorTile) {
  }

  execute(actor: Entity, mapEngine: MapEngine): ActionResult {
    EventLog.getInstance().message = 'You trying to open door';
    this._tile.flipDoor();
    actor.setNextAction(null);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
