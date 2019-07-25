import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Tile} from '../base/tile';
import {DoorTile} from '../tiles/door-tile';
import {OpenDoorAction} from '../actions/open-door-action';

export class OpenDoorCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    const tiles: Array<Array<Tile>> = <Array<Array<Tile>>>gameEngine.getMapEngine()
                                                                    .getTilesAround(actor.position);
    for (const row of tiles) {
      for (const tile of row) {
        if (tile instanceof DoorTile) {
          actor.setNextAction(new OpenDoorAction(<DoorTile>gameEngine.getMapEngine()
                                                                     .getTileOrEntityAt(tile.position)));
          return;
        }
      }
    }
  }
}
