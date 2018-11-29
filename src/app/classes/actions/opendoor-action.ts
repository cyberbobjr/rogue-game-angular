import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {MapEngine} from '../../services/map-engine.service';
import {DoorTile} from '../tiles/door-tile';

export class OpendoorAction implements Iaction {
  private _info = '';

  constructor(private _tile: DoorTile) {
  }

  execute(actor: Entity, mapEngine: MapEngine): ActionResult {
    console.log('open door action');
    this._tile.flipDoor();
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
