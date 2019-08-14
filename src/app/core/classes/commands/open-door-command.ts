import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {Tile} from '../base/tile';
import {DoorTile} from '../tiles/door-tile';
import {OpenDoorAction} from '../actions/open-door-action';

export class OpenDoorCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    const tiles: Array<Array<Tile>> = <Array<Array<Tile>>>this._gameEngine.getMapEngine()
                                                              .getTilesAround(actor.position);
    for (const row of tiles) {
      for (const tile of row) {
        if (tile instanceof DoorTile) {
          actor.setNextAction(new OpenDoorAction(<DoorTile>this._gameEngine.getMapEngine()
                                                               .getTileOrEntityAt(tile.position)));
          return;
        }
      }
    }
  }
}
