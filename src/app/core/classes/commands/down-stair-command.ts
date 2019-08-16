import {AbstractCommand, Command} from '../../interfaces/command';
import {Tile} from '../base/tile';
import {TileType} from '../../enums/tile-type.enum';
import {EventLog} from '../Utility/event-log';

export class DownStairCommand extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    const tile: Tile = <Tile>this._gameEngine.getMapEngine()
                                 .getTileAt(this.actor.position);
    if (tile.type === TileType.STAIRDOWN) {
      this.gotoDownStair();
    } else {
      EventLog.getInstance().message = 'What ?!?!';
    }
  }

  public gotoDownStair(): void {
    if (this.actor.mapLevel === 1) {
      EventLog.getInstance().message = `You  can't go down !`;
    } else {
      const newLevel: number = this.actor.mapLevel - 1;
      this._gameEngine.changeLevel(newLevel);
      EventLog.getInstance().message = `You down the stair to level ${newLevel}`;
    }
  }
}
