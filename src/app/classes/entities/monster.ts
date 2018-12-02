import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';

export class Monster extends Entity {
  constructor(props) {
    super(props);
    this.sprite = SpritesFactory.createSprite(SpriteType.ORC);
  }
}
