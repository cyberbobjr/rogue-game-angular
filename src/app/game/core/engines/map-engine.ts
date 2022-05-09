import {Iobject} from '@core/interfaces/iobject';
import {Position2D} from '@core/core/base/position2D';
import {Entity} from '@core/core/base/entity';
import {Tile} from '@core/core/base/tile';
import {GameMap} from '@core/interfaces/GameMap';

export class MapEngine {
    private _currentMap: GameMap = null;

    constructor() {
    }

    setGameMap(value: GameMap): GameMap {
        this._currentMap = value;
        return this._currentMap;
    }

    getCurrentMap(): GameMap {
        return this._currentMap;
    }

    getNextPosition(originPosition: Position2D, destPosition: Position2D): Position2D | null {
        return this._currentMap
                   .getNextPosition(originPosition, destPosition);
    }

    getTilesAround(position: Position2D): Array<Array<Iobject>> {
        return this._currentMap
                   .getTilesAround(position);
    }

    getTileAt(position: Position2D): Tile {
        return <Tile>this.getCurrentMap()
                         .getTileAt(position);
    }

    computeLOSMap(actorLOS: Entity) {
        this.getCurrentMap()
            .computeLOSMap(actorLOS);
    }
}
