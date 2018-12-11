import {Iaction} from '../../interfaces/iaction';
import {ActionResult} from './action-result';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {EventLog} from '../event-log';
import {Entity} from '../base/entity';
import {Tile} from '../base/tile';
import {GoldTile} from '../tiles/gold-tile';
import {TilesFactory} from '../../factories/tiles-factory';
import {TileType} from '../../enums/tile-type.enum';

export class TakeAction implements Iaction {
  constructor(private _actor,
              private _mapEngine: MapEngine) {
  }

  execute(actor: Entity): ActionResult {
    const tile: Tile = this._mapEngine.getTileAt(actor.position) as Tile;
    if (this._parseTile(tile, actor)) {
      this._mapEngine.setTileAt(actor.position, TilesFactory.createTile(TileType.FLOOR));
    }
    EventLog.getInstance().message = 'Take object';
    return ActionResult.SUCCESS;
  }

  private _parseTile(tile: Tile, actor: Entity) {
    if (tile instanceof GoldTile) {
      actor.gp += tile.amount;
      return true;
    }
    return false;
  }

  getInfo(): string {
    return '';
  }
}
