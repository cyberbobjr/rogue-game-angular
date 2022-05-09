import {DoorTile} from '../tiles/door-tile';
import {Position2D} from '../base/position2D';
import {OpenDoorAction} from './open-door-action';
import {Player} from '../entities/player';
import {Entity} from '@core/core/base/entity';

describe('open-chest-action', () => {

    beforeEach(() => {
    });

    it('should open the door if door is closed', () => {
        const doorTile: DoorTile = new DoorTile(new Position2D(5, 5), true);
        const openDoorAction: OpenDoorAction = new OpenDoorAction(doorTile as unknown as Entity, null);
        openDoorAction.execute(new Player());
        expect(doorTile.isClosed).toBeFalsy();
    });

    it('should close the door if door is closed', () => {
        const doorTile: DoorTile = new DoorTile(new Position2D(5, 5), false);
        const openDoorAction: OpenDoorAction = new OpenDoorAction(doorTile as unknown as Entity, null);
        openDoorAction.execute(new Player());
        expect(doorTile.isClosed).toBeTruthy();
    });
});
