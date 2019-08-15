import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {GameMap} from '../base/game-map';
import {Player} from '../entities/player';

export class TeleportCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    console.log('Teleport');
    const gameMap: GameMap = this._gameEngine.getMapEngine().getCurrentMap();
    (actor as Player).setMapLevelAndPosition(gameMap.level, gameMap.exitPosition);
  }
}
