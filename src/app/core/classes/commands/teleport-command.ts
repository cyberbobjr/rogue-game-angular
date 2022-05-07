import {AbstractCommand, Command} from '../../interfaces/command';
import {GameMapImp} from '../base/game-map-imp';

export class TeleportCommand extends AbstractCommand implements Command {
  execute() {
    console.log('Teleport');
    this.actor = this._gameEngine.getPlayer();
    const gameMap: GameMapImp = this._gameEngine.getMapEngine().getCurrentMap();
    this.actor.setMapLevelAndPosition(gameMap.level, gameMap.exitPosition);
  }
}
