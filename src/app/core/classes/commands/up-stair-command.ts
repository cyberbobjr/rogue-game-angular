import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {Tile} from '../base/tile';
import {TileType} from '../../enums/tile-type.enum';
import {EventLog} from '../Utility/event-log';

export class UpStairCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    const tile: Tile = <Tile>this._gameEngine.getMapEngine()
                                 .getTileAt(actor.position);
    if (tile.type === TileType.STAIRUP) {
      this._gameEngine.gotoUpStair();
    } else {
      EventLog.getInstance().message = 'What ?!?!';
    }
  }
}
