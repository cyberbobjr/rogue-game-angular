import {Command} from './command';
import {Entity} from '../base/entity';
import {WalkAction} from '../actions/walk-action';
import {Direction} from '../../enums/direction.enum';
import {GameEngineService} from '../../services/game-engine.service';

export class MoveE extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.E, gameEngine.mapEngine.map));
  }
}

export class MoveW extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.W, gameEngine.mapEngine.map));
  }
}

export class MoveS extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.S, gameEngine.mapEngine.map));
  }
}

export class MoveN extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.N, gameEngine.mapEngine.map));
  }
}

export class MoveNE extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NE, gameEngine.mapEngine.map));
  }
}

export class MoveNW extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.NW, gameEngine.mapEngine.map));
  }
}

export class MoveSE extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SE, gameEngine.mapEngine.map));
  }
}

export class MoveSW extends Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new WalkAction(Direction.SW, gameEngine.mapEngine.map));
  }
}
