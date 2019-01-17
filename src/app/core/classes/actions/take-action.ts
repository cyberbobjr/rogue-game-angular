import {Iaction} from '../../interfaces/iaction';
import {ActionResult} from './action-result';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {EventLog} from '../event-log';
import {Entity} from '../base/entity';
import {Tile} from '../base/tile';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class TakeAction implements Iaction {
  constructor(private _actor,
              private _mapEngine: MapEngine) {
  }

  execute(subject: Entity, gameEngine: GameEngineService): ActionResult {
    const tile: Tile = this._mapEngine.getTileAt(subject.position) as Tile;
    EventLog.getInstance().message = 'Take object';
    tile.onTake(subject);
    return ActionResult.SUCCESS;
  }


  getInfo(): string {
    return '';
  }
}
