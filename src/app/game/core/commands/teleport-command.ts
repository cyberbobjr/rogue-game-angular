import {AbstractCommand, Command} from '../../interfaces/command';
import {GameMap} from '@core/interfaces/GameMap';

export class TeleportCommand extends AbstractCommand implements Command {
    execute() {
        console.log('Teleport');
        this.actor = this._gameEngine.getPlayer();
        const gameMap: GameMap = this._gameEngine.getMapEngine().getCurrentMap();
        this.actor.setMapLevelAndPosition(gameMap.level, gameMap.exitPosition);
    }
}
