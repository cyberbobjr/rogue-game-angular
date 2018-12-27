import {Command} from './command';
import {Entity} from '../base/entity';
import {WalkAction} from '../actions/walk-action';
import {Direction} from '../../enums/direction.enum';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class MoveE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.E));
  }
}

export class MoveW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.W));
  }
}

export class MoveS implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.S));
  }
}

export class MoveN implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.N));
  }
}

export class MoveNE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NE));
  }
}

export class MoveNW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NW));
  }
}

export class MoveSE implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SE));
  }
}

export class MoveSW implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SW));
  }
}
