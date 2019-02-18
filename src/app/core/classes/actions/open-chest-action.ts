import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Tile} from '../base/tile';
import {ChestTile} from '../tiles/chest-tile';

export class OpenChestAction implements Iaction {
  constructor(private _actor: Entity) {
  }

  execute(subject: Entity, gameEngine: GameEngineService): ActionResult {
    const mapEngine: MapEngine = gameEngine.getMapEngine();
    const tile: Tile = mapEngine.getTileAt(this._actor.position);
    if (tile instanceof ChestTile) {
      EventLog.getInstance().message = 'You trying to open chest';
      tile.openChest();
      subject.setNextAction(null);
      return ActionResult.SUCCESS;
    } else {
      EventLog.getInstance().message = 'What ?!?!';
      subject.setNextAction(null);
      return ActionResult.SUCCESS;
    }
  }

  getInfo(): string {
    return '';
  }

}
