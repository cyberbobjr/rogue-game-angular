import {AbstractCommand, Command} from '../../interfaces/command';
import {WalkAction} from '../actions/walk-action';
import {Direction} from '../../enums/direction.enum';

export class MoveE extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.E));
  }
}

export class MoveW extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.W));
  }
}

export class MoveS extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.S));
  }
}

export class MoveN extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.N));
  }
}

export class MoveNE extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.NE));
  }
}

export class MoveNW extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.NW));
  }
}

export class MoveSE extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.SE));
  }
}

export class MoveSW extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new WalkAction(Direction.SW));
  }
}
