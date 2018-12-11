import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {Position} from '../base/position';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {TilesFactory} from '../../factories/tiles-factory';
import {TileType} from '../../enums/tile-type.enum';
import {GoldTile} from '../tiles/gold-tile';

export class Monster extends Entity {

  static fromJson(name: string, position: Position, sprite: Sprite, jsonData: any): Monster {
    const {type, gp, hp, strength, constitution, charisma, wisdom, intelligence, dexterity, ac} = jsonData;
    const monster: Monster = new this(name, position, sprite);
    monster.strength = strength;
    monster.dexterity = dexterity;
    monster.constitution = constitution;
    monster.intelligence = intelligence;
    monster.wisdom = wisdom;
    monster.charisma = charisma;
    monster.ac = ac;
    monster.hp = hp;
    monster.gp = gp;
    monster.type = type;
    return monster;
  }

  onDead(mapEngine: MapEngine): void {
    // drop gold
    const goldTile: GoldTile = TilesFactory.createTile(TileType.GOLD) as GoldTile;
    goldTile.amount = this.gp;
    mapEngine.setTileAt(this.position.clone(), goldTile);
  }
}
