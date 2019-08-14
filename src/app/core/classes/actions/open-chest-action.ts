import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Tile} from '../base/tile';
import {ChestTile} from '../tiles/chest-tile';

export class OpenChestAction implements Action {
  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngineImp): ActionResult {
    const mapEngine: MapEngine = gameEngine.getMapEngine();
    const tile: Tile = mapEngine.getTileAt(actor.position);
    if (tile instanceof ChestTile) {
      EventLog.getInstance().message = 'You trying to open chest';
      tile.openChest();
      actor.setNextAction(null);
      return ActionResult.SUCCESS;
    } else {
      EventLog.getInstance().message = 'What ?!?!';
      actor.setNextAction(null);
      return ActionResult.SUCCESS;
    }
  }

  getInfo(): string {
    return '';
  }

}
