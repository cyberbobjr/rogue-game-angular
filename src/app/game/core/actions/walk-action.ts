import {Action} from '../../interfaces/action';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {Position2D} from '../base/position2D';
import {AttackMeleeAction} from './attack-melee-action';
import {Monster} from '../entities/monster';
import {GameEngine} from '@core/core/engines/GameEngine';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class WalkAction extends AbstractAction implements Action {
    private _info = '';

    constructor(protected _direction: Direction,
                protected _gameEngine: GameEngine) {
        super(null, _gameEngine);
    }

    /**
     * TODO : refactor to FSM
     */
    execute(actor: Entity): ActionResult {
        const destPosition: Position2D = actor.position.computeDestination(this._direction);
        const tile: Tile | Entity = <Tile | Entity>this._gameEngine.getTileOrEntityAt(destPosition);
        if (tile instanceof Tile && tile.isWalkable()) {
            tile.onWalk(actor);
            actor.position = destPosition;
            actor.setNextAction(null);
            return ActionResult.SUCCESS;
        }
        const result = ActionResult.FAILURE;
        if (tile instanceof Monster) {
            EventLog.getInstance().message = `You hit ${tile.name}`;
            result.alternative = new AttackMeleeAction(tile as Entity, this._gameEngine);
            return result;
        }
        if (tile instanceof Tile) {
            result.alternative = tile.onHit(actor as Entity);
            return result;
        }
        if (tile instanceof Entity) {
            actor.setNextAction(null);
            return ActionResult.SUCCESS;
        }
    }

    getInfo(): string {
        return this._info;
    }
}
