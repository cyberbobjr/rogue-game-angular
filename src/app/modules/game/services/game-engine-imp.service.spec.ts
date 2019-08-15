import {TestBed} from '@angular/core/testing';

import {GameEngineImp} from './game-engine-imp.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {GameEngine} from '../../../core/interfaces/game-engine';
import {GameMap} from '../../../core/classes/base/game-map';
import {MapBuilder} from '../../../core/factories/map-builder';
import {GameEntities} from '../../../core/classes/base/game-entities';
import {EntityBuilder} from '../../../core/factories/entity-builder';
import {EntityType} from '../../../core/enums/entity-type.enum';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {Player} from '../../../core/classes/entities/player';
import {Position} from '../../../core/classes/base/position';
import {Entity} from '../../../core/classes/base/entity';

describe('GameEngine', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule,
      RouterTestingModule
    ],
    providers: [
      GameEngineImp
    ]
  }));

  it('should be created', () => {
    const service: GameEngine = TestBed.get(GameEngineImp);
    expect(service)
      .toBeTruthy();
  });

  it('should load game', () => {
    const maxEntities = 5;
    const width = 20;
    const height = 10;
    const gameEngine: GameEngine = TestBed.get(GameEngineImp);
    const gameMap: GameMap = new MapBuilder().withSize(width, height).build();
    const gameEntities: GameEntities = EntityBuilder.generateMonsters([], maxEntities, gameMap);
    gameEngine.loadGame(gameMap, gameEntities);
    expect(gameEngine.getEntityEngine().getAllEntities().length).toEqual(maxEntities);
    expect(gameEngine.getMapEngine().getCurrentMap().width).toEqual(width);
    expect(gameEngine.getMapEngine().getCurrentMap().height).toEqual(height);
  });

  it('should return player', () => {
    const player: Player = EntitiesFactory.getInstance().createEntity(EntityType.PLAYER) as Player;
    player.setMapLevelAndPosition(1, new Position(5, 5));
    const gameEngine: GameEngine = TestBed.get(GameEngineImp);
    gameEngine.setPlayer(player);
  });

  it('should return visible entities', () => {

  });

  it('should return tile or entity at position', () => {

  });

  it('should goto downstair', () => {

  });

  it('should goto upstair', () => {

  });
});
