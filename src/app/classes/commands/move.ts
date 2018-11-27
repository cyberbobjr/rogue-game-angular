import {Command} from './command';
import {Entity} from '../base/entity';
import {WalkAction} from '../actions/walk-action';
import {Direction} from '../../enums/direction.enum';
import {GameEngineService} from '../../services/game-engine.service';

export class MoveE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.E, gameEngine.mapEngine.map));
  }
}

export class MoveW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.W, gameEngine.mapEngine.map));
  }
}

export class MoveS implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.S, gameEngine.mapEngine.map));
  }
}

export class MoveN implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.N, gameEngine.mapEngine.map));
  }
}

export class MoveNE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NE, gameEngine.mapEngine.map));
  }
}

export class MoveNW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NW, gameEngine.mapEngine.map));
  }
}

export class MoveSE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SE, gameEngine.mapEngine.map));
  }
}

export class MoveSW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SW, gameEngine.mapEngine.map));
  }
}
