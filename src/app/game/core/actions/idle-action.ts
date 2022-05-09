import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {Position2D} from '../base/position2D';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {ChaseAction} from './chase-action';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class IdleAction extends AbstractAction implements Action {
    private _info = '';

    execute(actor: Entity): ActionResult {
        if (actor.sprite.light) {
            EventLog.getInstance().message = 'Player in sight !';
            actor.setNextAction(new ChaseAction(this._gameEngine.getPlayer(), this._gameEngine));
        } else {
            const destPosition: Position2D = this._getRandomPosition(actor);
            const tile: Tile = <Tile>this._gameEngine.getTileOrEntityAt(destPosition);
            if (tile instanceof Tile && tile.isWalkable()) {
                actor.position = destPosition;
                tile.onWalk(actor);
            }
        }
        return ActionResult.SUCCESS;
    }

    getInfo(): string {
        return this._info;
    }

    private _getRandomPosition(subject: Entity): Position2D {
        const direction: Direction = this._getRandomDirection();
        return subject.position.computeDestination(direction);
    }

    private _getRandomDirection(): Direction {
        return Direction.getRandom();
    }
}
