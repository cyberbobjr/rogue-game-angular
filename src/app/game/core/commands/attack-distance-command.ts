import {AbstractCommand, Command} from '../../interfaces/command';
import {FireAction} from '../actions/fire-action';

export class AttackDistanceCommand extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new FireAction(null, this._gameEngine));
    }
}
