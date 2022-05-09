import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {Position2D} from '../base/position2D';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {AttackMeleeAction} from './attack-melee-action';
import {DoorTile} from '../tiles/door-tile';
import {Monster} from '../entities/monster';
import {MapEngine} from '@core/core/engines/map-engine';
import {IdleAction} from './idle-action';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class ChaseAction extends AbstractAction implements Action {
    private _info = 'Chase Action';
    private _mapEngine: MapEngine = null;

    execute(actor: Entity): ActionResult {
        this._mapEngine = this._gameEngine.getMapEngine();
        if (!actor.sprite.light && (actor instanceof Monster)) {
            if ((actor as Monster).canFollowChase()) {
                actor.setNextAction(new IdleAction(null, this._gameEngine));
                return ActionResult.SUCCESS;
            }
        }
        EventLog.getInstance().message = `${actor.name} chasing`;
        const destPosition: Position2D = this._mapEngine.getNextPosition(actor.position, this._target.position);
        if (destPosition) {
            return this._moveActor(actor, destPosition);
        }
        return ActionResult.SUCCESS;
    }

    getInfo(): string {
        return this._info;
    }

    private _moveActor(actor: Entity, destPosition: Position2D): ActionResult {
        const info: Entity | Tile = <Entity | Tile>this._gameEngine.getTileOrEntityAt(destPosition);
        if (info instanceof Player) {
            const result = ActionResult.FAILURE;
            result.alternative = new AttackMeleeAction(info as Entity, this._gameEngine);
            return result;
        }
        if (info instanceof Tile && info.isWalkable()) {
            info.onWalk(actor);
            actor.position = destPosition;
            return ActionResult.SUCCESS;
        }
        if (info instanceof DoorTile && (info as DoorTile).isClosed && (actor instanceof Monster)) {
            if ((actor as Monster).canOpenDoor()) {
                info.openDoor();
                EventLog.getInstance().message = `${actor.name} open the door !`;
            }
        }
        return ActionResult.SUCCESS;
    }
}
