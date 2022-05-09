import {Position2D} from '@core/core/base/position2D';
import {Sprite} from '@core/core/base/sprite';
import {Display} from 'rot-js/lib';
import * as Color from 'color';
import {Entity} from '@core/core/base/entity';
import {Utility} from '@core/core/Utility/utility';
import {Tile} from '@core/core/base/tile';
import {GameEntities} from '@core/core/base/game-entities';
import {GameMap} from '@core/interfaces/GameMap';

interface BufferTile {
    sprite: Sprite;
    los: number;
}

export class  DisplayEngine {
    private _display: Display = new Display();
    maxVisiblesCols = 20;
    maxVisiblesRows = 20;
    buffer: Array<Array<BufferTile | number>>;

    get display(): Display {
        return this._display;
    }

    get container(): HTMLElement | null {
        return this.display.getContainer();
    }

    constructor() {
        this.buffer = Utility.initArrayNumber(this.maxVisiblesCols, this.maxVisiblesRows);
    }

    public initDisplay(maxHeight: number, fontSize: number) {
        this.display.setOptions({height: maxHeight, fontSize});
        this.display.clear();
        const [width, height] = (this.display.computeSize(this.container.offsetWidth, this.container.offsetHeight));
        this.maxVisiblesCols = width;
        this.maxVisiblesRows = height;
    }

    public drawGameMap(gameMap: GameMap, gameEntities: GameEntities) {
        // prepare map for drawing
        const cameraPosition = gameEntities.getPlayer().position;
        const cameraStartPosition: Position2D = this._getStartViewPortOfPosition(cameraPosition);
        // get map data
        const bufferTile: Tile[][] = gameMap.extractTiles(cameraStartPosition.x, cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
        const bufferLos: number[][] = gameMap.extractLosMap(cameraStartPosition.x, cameraStartPosition.y, this.maxVisiblesCols, this.maxVisiblesRows);
        const entities: Array<Entity> = gameEntities.getEntitiesVisiblesOnMap(gameMap);
        // build buffer
        const buffer: Array<Array<BufferTile>> = this._buildBuffer(bufferTile, bufferLos, entities);

        this._display.clear();
        this._drawBuffer(buffer);
    }

    private _buildBuffer(bufferTile: Tile[][], bufferLos: number[][], entities: Array<Entity>): Array<Array<BufferTile>> {
        const buffer: Array<Array<BufferTile>> = new Array(bufferTile.length);
        for (let y = 0; y < bufferTile.length; y++) {
            buffer[y] = new Array(bufferTile[y].length);
            for (let x = 0; x < bufferTile[y].length; x++) {
                const tile: Tile = bufferTile[y][x];
                const entityPresent: Entity | undefined = entities.find(entity => entity.position.equal(tile.position));
                buffer[y][x] = {sprite: entityPresent ? entityPresent.sprite : tile.sprite, los: bufferLos[y][x]};
            }
        }
        return buffer;
    }

    private _getStartViewPortOfPosition(cameraPosition: Position2D) {
        const x = cameraPosition.x - Math.round(this.maxVisiblesCols / 2);
        const y = cameraPosition.y - Math.round(this.maxVisiblesRows / 2);
        return new Position2D(x, y);
    }

    private _drawBuffer(buffer: Array<Array<BufferTile>>) {
        try {
            for (let j = 0; j < buffer.length; j++) {
                for (let i = 0; i < buffer[j].length; i++) {
                    const sprite: Sprite = buffer[j][i].sprite;
                    const losValue: number = buffer[j][i].los;
                    if (sprite && losValue > 0) {
                        this._display.draw(i, j, sprite.character, this._darkenColor(sprite.color, losValue), this._darkenColor(sprite.bgColor, losValue));
                    }
                }
            }
        } catch (e) {
            console.log(e);
            console.trace();
        }
    }

    private _darkenColor(color: string, fovValue: number): string {
        return Color(color)
            .darken(fovValue)
            .hex();
    }
}
