import {Iaction} from '../../interfaces/iaction';
import {ActionResult} from './action-result';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {EventLog} from '../event-log';
import {Entity} from '../base/entity';
import {Tile} from '../base/tile';
import {GameEngine} from '../../../modules/game/services/game-engine.service';

export class TakeAction implements Iaction {
  private _subject: Entity;

  set subject(value: Entity) {
    this._subject = value;
  }

  constructor() {
  }

  execute(gameEngine: GameEngine): ActionResult {
    const mapEngine: MapEngine = gameEngine.getMapEngine();
    const tile: Tile = mapEngine.getTileAt(this._subject.position) as Tile;
    EventLog.getInstance().message = 'Take object';
    tile.onTake(this._subject);
    return ActionResult.SUCCESS;
  }


  getInfo(): string {
    return '';
  }
}
