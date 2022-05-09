import {Position2D} from '../core/base/position2D';
import {Room} from 'rot-js/lib/map/features';
import {Tile} from '@core/core/base/tile';
import {Entity} from '@core/core/base/entity';

export interface GameMap {
    get rooms(): Array<Room>;

    get level(): number;

    getFreePositionForRoom(roomNumber: number): Position2D | null;

    extractTiles(startPosX: number, startPosY: number, width: number, height: number): Tile[][];

    extractLosMap(startPosX: number, startPosY: number, width: number, height: number): number[][];

    isPositionVisible(position: Position2D): boolean;

    getNextPosition(originPosition: Position2D, destPosition: Position2D): Position2D | null;

    getTilesAround(position: Position2D): Array<Array<Tile>>;

    getTileAt(position: Position2D): Tile;

    computeLOSMap(mainActor: Entity): GameMap;

    getLosForPosition(position: Position2D): number;

    getAllPosition<T>(ctor: { new(...args: any[]): T }): Array<Position2D>;

    get exitPosition(): Position2D;

    get height(): number;

    get width(): number;
}
