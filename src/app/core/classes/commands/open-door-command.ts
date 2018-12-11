import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Tile} from '../base/tile';
import {DoorTile} from '../tiles/door-tile';
import {OpendoorAction} from '../actions/opendoor-action';

export class OpenDoorCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    const tiles: Array<Array<Tile>> = <Array<Array<Tile>>>gameEngine.mapEngine.getTilesAround(actor.position);
    for (const row of tiles) {
      for (const tile of row) {
        if (tile instanceof DoorTile) {
          actor.setNextAction(new OpendoorAction(<DoorTile>gameEngine.mapEngine.getTileOrEntityAt(tile.position), gameEngine.mapEngine));
          return;
        }
      }
    }
  }
}
