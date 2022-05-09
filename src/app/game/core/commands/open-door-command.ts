import {AbstractCommand, Command} from '../../interfaces/command';
import {Tile} from '../base/tile';
import {DoorTile} from '../tiles/door-tile';
import {OpenDoorAction} from '../actions/open-door-action';
import {Action} from '@core/interfaces/action';
import {Entity} from '@core/core/base/entity';

export class OpenDoorCommand extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        const tiles: Array<Array<Tile>> = <Array<Array<Tile>>>this._gameEngine
                                                                  .getMapEngine()
                                                                  .getTilesAround(this.actor.position);
        for (const row of tiles) {
            for (const tile of row) {
                if (tile instanceof DoorTile) {
                    const action: Action = new OpenDoorAction(tile as unknown as Entity, this._gameEngine);
                    this.actor.setNextAction(action);
                    return;
                }
            }
        }
    }
}
