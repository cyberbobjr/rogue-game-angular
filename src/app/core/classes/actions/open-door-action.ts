import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {DoorTile} from '../tiles/door-tile';
import {EventLog} from '../event-log';
import {GameEngine} from '../../../modules/game/services/game-engine.service';

export class OpenDoorAction implements Iaction {
  private _info = '';
  private _subject: Entity;

  set subject(value: Entity) {
    this._subject = value;
  }

  constructor(private _tile: DoorTile) {
  }

  execute(gameEngine: GameEngine): ActionResult {
    EventLog.getInstance().message = 'You trying to open door';
    this._tile.flipDoor();
    this._subject.setNextAction(null);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
