import {ChooseTarget} from './choose-target';
import {SharedModule} from '../../../modules/shared/shared.module';
import {GameEngineImp} from '../../../services/game-engine-imp.service';
import {StorageEngine} from '../../../services/storage-engine.service';
import {MapBuilder} from '../../factories/map-builder';
import {FloorTile} from '../tiles/floor-tile';
import {Position2D} from '../base/position2D';
import {GameMapImp} from '../base/game-map-imp';
import {TestBed} from '@angular/core/testing';
import {Entity} from '../base/entity';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesFactory} from '../../factories/entities-factory';
import {GameEngine} from '../engines/GameEngine';
import {GameEntities} from '../base/game-entities';
import {EntityBuilder} from '../../factories/entity-builder';
import {Player} from '../entities/player';

describe('choose target testing', () => {
  let gameEngine: GameEngine;
  let gameMap: GameMapImp;
  let gameEntities: GameEntities;
  const visibleEntities: Array<Entity> = [
    EntitiesFactory.generateRandomEntities(new Position2D(1, 1)),
    EntitiesFactory.generateRandomEntities(new Position2D(2, 2)),
    EntitiesFactory.generateRandomEntities(new Position2D(3, 3))
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [StorageEngine]
    });
    gameEngine = TestBed.get(GameEngineImp);
    gameMap = new MapBuilder().build();
    gameEntities = EntityBuilder.generateEntitiesOnMap([], 5, gameMap);
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        gameMap.setTile(new FloorTile(new Position2D(x, y)));
      }
    }
    gameEngine.loadGame(gameMap, gameEntities, new Player(new Position2D(5, 5)));
  });

  it('should be created', () => {
    const chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, (entities: Entity[]) => {
    });
    expect(chooseTarget)
      .toBeDefined();
  });

  it('should choose next target', () => {
    spyOn(gameEngine, 'getEntitiesVisibles')
      .and
      .returnValues(visibleEntities);
    const chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, (entities: Entity[] | null) => {
      expect(entities)
        .toBeNull();
    });
    chooseTarget.keyboardHandler.handleActionKeyEvent(new KeyboardEvent('', {code: 'Plus'}));
    expect(chooseTarget.currentTargetIndex)
      .not
      .toEqual(0);
  });

  it('should choose previous target', () => {
    spyOn(gameEngine, 'getEntitiesVisibles')
      .and
      .returnValues(visibleEntities);
    const chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, (entities: Entity[] | null) => {
      expect(entities)
        .toBeNull();
    });
    chooseTarget.keyboardHandler.handleActionKeyEvent(new KeyboardEvent('', {code: 'Minus'}));
    expect(chooseTarget.currentTargetIndex)
      .toEqual(visibleEntities.length - 1);
  });

  it('should fire target', () => {
    spyOn(gameEngine, 'getEntitiesVisibles')
      .and
      .returnValues(visibleEntities);
    const chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, (entities: Entity[] | null) => {
      expect(entities.length)
        .toEqual(1);
      expect(entities[0])
        .toEqual(visibleEntities[0]);
    });
    chooseTarget.keyboardHandler.handleActionKeyEvent(new KeyboardEvent('', {code: 'KeyF'}));
  });

  it('should cancel action', () => {
    spyOn(gameEngine, 'getEntitiesVisibles')
      .and
      .returnValues(visibleEntities);
    const chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, (entities: Entity[] | null) => {
      expect(entities)
        .toBeNull();
    });
    chooseTarget.keyboardHandler.handleActionKeyEvent(new KeyboardEvent('', {code: 'KeyEsc'}));
  });
});
