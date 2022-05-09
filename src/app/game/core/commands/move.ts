import {AbstractCommand, Command} from '../../interfaces/command';
import {WalkAction} from '../actions/walk-action';
import {Direction} from '../../enums/direction.enum';

export class MoveE extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.E, this._gameEngine));
    }
}

export class MoveW extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.W, this._gameEngine));
    }
}

export class MoveS extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.S, this._gameEngine));
    }
}

export class MoveN extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.N, this._gameEngine));
    }
}

export class MoveNE extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.NE, this._gameEngine));
    }
}

export class MoveNW extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.NW, this._gameEngine));
    }
}

export class MoveSE extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.SE, this._gameEngine));
    }
}

export class MoveSW extends AbstractCommand implements Command {
    execute() {
        this.actor = this._gameEngine.getPlayer();
        this.actor.setNextAction(new WalkAction(Direction.SW, this._gameEngine));
    }
}
