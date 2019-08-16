import {AbstractCommand, Command} from '../../interfaces/command';
import {Tile} from '../base/tile';
import {TileType} from '../../enums/tile-type.enum';
import {EventLog} from '../Utility/event-log';
import {Config} from '../../config';

export class UpStairCommand extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    const tile: Tile = <Tile>this._gameEngine.getMapEngine()
                                 .getTileAt(this.actor.position);
    if (tile.type === TileType.STAIRUP) {
      this.gotoUpStair();
    } else {
      EventLog.getInstance().message = 'What ?!?!';
    }
  }

  private gotoUpStair(): void {
    if (this.actor.mapLevel === Config.maxLevel) {
      this._gameEngine.winGame();
    } else {
      const newLevel: number = this.actor.mapLevel + 1;
      EventLog.getInstance().message = `You up the stair to level ${newLevel}`;
      this._gameEngine.changeLevel(newLevel);
    }
  }
}
