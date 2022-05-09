import {Tile} from '../base/tile';
import {SpriteType} from '../../enums/sprite-type.enum';
import {SpritesFactory} from '../../factories/sprites-factory';
import {Position2D} from '../base/position2D';
import {TileType} from '../../enums/tile-type.enum';
import {JSonCell} from '../../interfaces/json-interfaces';
import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';

export class WallTile extends Tile {
    _type = TileType.WALL;
    _name = 'wall';

    static fromJSON(json: JSonCell): WallTile {
        return new this(new Position2D(json.position.x, json.position.y));
    }

    constructor(position?: Position2D) {
        super();
        this.sprite = SpritesFactory.createSprite(SpriteType.WALL);
        this._opaque = true;
        this.position = position;
    }

    isWalkable(): boolean {
        return false;
    }

    onHit(actor: Entity): Action | null {
        return null;
    }
}
