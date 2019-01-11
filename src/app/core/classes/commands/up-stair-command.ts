import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Tile} from '../base/tile';
import {TileType} from '../../enums/tile-type.enum';
import {EventLog} from '../event-log';

export class UpStairCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    const tile: Tile = <Tile>gameEngine.getMapEngine()
                                       .getTileAt(actor.position);
    if (tile.type === TileType.STAIRUP) {
      gameEngine.gotoUpStair();
    } else {
      EventLog.getInstance().message = 'What ?!?!';
    }
  }
}
