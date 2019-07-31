import {ChooseTarget} from './choose-target';
import {SharedModule} from '../../../modules/shared/shared.module';
import {EntitiesEngine} from '../../../modules/game/services/entities-engine.service';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {StorageService} from '../../../modules/game/services/storage.service';
import {MapBuilder} from '../../factories/map-builder';
import {FloorTile} from '../tiles/floor-tile';
import {Position} from '../base/position';
import {GameMap} from '../base/game-map';
import {TestBed} from '@angular/core/testing';
import {Entity} from '../base/entity';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesFactory} from '../../factories/entities-factory';

describe('choose target testing', () => {
  let gameEngine: GameEngine;
  let gameMap: GameMap;
  const visibleEntities: Array<Entity> = [
    EntitiesFactory.generateRandomEntities(new Position(1, 1)),
    EntitiesFactory.generateRandomEntities(new Position(2, 2)),
    EntitiesFactory.generateRandomEntities(new Position(3, 3))
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [
                                       SharedModule,
                                       RouterTestingModule
                                     ],
                                     providers: [EntitiesEngine,
                                                 GameEngine,
                                                 MapEngine,
                                                 StorageService]
                                   });
    gameEngine = TestBed.get(GameEngine);
    gameMap = new MapBuilder().build();
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        gameMap.setTile(new FloorTile(new Position(x, y)));
      }
    }
    gameEngine.loadGameMap(gameMap);
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
    chooseTarget.keyboardHandler(new KeyboardEvent('', {code: 'Plus'}));
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
    chooseTarget.keyboardHandler(new KeyboardEvent('', {code: 'Minus'}));
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
    chooseTarget.keyboardHandler(new KeyboardEvent('', {code: 'KeyF'}));
  });

  it('should cancel action', () => {
    spyOn(gameEngine, 'getEntitiesVisibles')
      .and
      .returnValues(visibleEntities);
    const chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, (entities: Entity[] | null) => {
      expect(entities)
        .toBeNull();
    });
    chooseTarget.keyboardHandler(new KeyboardEvent('', {code: 'KeyEsc'}));
  });
});
