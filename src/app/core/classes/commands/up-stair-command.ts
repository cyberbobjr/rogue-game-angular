import {Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Tile} from '../base/tile';
import {TileType} from '../../enums/tile-type.enum';
import {EventLog} from '../Utility/event-log';

export class UpStairCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    const tile: Tile = <Tile>gameEngine.getMapEngine()
                                       .getTileAt(actor.position);
    if (tile.type === TileType.STAIRUP) {
      gameEngine.gotoUpStair();
    } else {
      EventLog.getInstance().message = 'What ?!?!';
    }
  }
}
