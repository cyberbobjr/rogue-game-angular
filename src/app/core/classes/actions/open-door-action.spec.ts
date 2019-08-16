import {DoorTile} from '../tiles/door-tile';
import {Position} from '../base/position';
import {OpenDoorAction} from './open-door-action';
import {Player} from '../entities/player';

describe('open-chest-action', () => {

  beforeEach(() => {
  });

  it('should open the door if door is closed', () => {
    const doorTile: DoorTile = new DoorTile(new Position(5, 5), true);
    const openDoorAction: OpenDoorAction = new OpenDoorAction(doorTile);
    openDoorAction.execute(new Player(), null);
    expect(doorTile.isClosed).toBeFalsy();
  });

  it('should close the door if door is closed', () => {
    const doorTile: DoorTile = new DoorTile(new Position(5, 5), false);
    const openDoorAction: OpenDoorAction = new OpenDoorAction(doorTile);
    openDoorAction.execute(new Player(), null);
    expect(doorTile.isClosed).toBeTruthy();
  });
});
