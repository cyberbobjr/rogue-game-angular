import {Command} from './command';
import {Entity} from '../base/entity';
import {WalkAction} from '../actions/walk-action';
import {Direction} from '../../enums/direction.enum';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class MoveE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.E, gameEngine.mapEngine));
  }
}

export class MoveW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.W, gameEngine.mapEngine));
  }
}

export class MoveS implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.S, gameEngine.mapEngine));
  }
}

export class MoveN implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.N, gameEngine.mapEngine));
  }
}

export class MoveNE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NE, gameEngine.mapEngine));
  }
}

export class MoveNW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NW, gameEngine.mapEngine));
  }
}

export class MoveSE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SE, gameEngine.mapEngine));
  }
}

export class MoveSW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SW, gameEngine.mapEngine));
  }
}
