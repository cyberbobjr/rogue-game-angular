import {Entity} from './entity';
import {PlayerTile} from '../tiles/player-tile';

export class Player extends Entity {
  constructor(props) {
    super(props);
    this.character = new PlayerTile();
  }
}
