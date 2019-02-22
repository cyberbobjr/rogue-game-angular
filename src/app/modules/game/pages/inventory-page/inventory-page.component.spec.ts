import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InventoryPageComponent} from './inventory-page.component';
import {EntitiesFactory} from '../../../../core/factories/entities-factory';
import {Player} from '../../../../core/classes/entities/player';
import {EntityType} from '../../../../core/enums/entity-type.enum';
import {RaceFactory} from '../../../../core/factories/race-factory';
import {RaceType} from '../../../../core/enums/race-type.enum';
import {GameClassFactory} from '../../../../core/factories/game-class-factory';
import {ClassType} from '../../../../core/enums/class-type.enum';
import {GameMap} from '../../../../core/classes/base/game-map';
import {MapBuilder} from '../../../../core/factories/map-builder';
import {GameObjectFactory} from '../../../../core/factories/game-object-factory';
import {GameObjectType} from '../../../../core/enums/game-object-type.enum';
import {EntitiesManager} from '../../services/entities-manager.service';

describe('InventoryPageComponent', () => {
  let component: InventoryPageComponent;
  let fixture: ComponentFixture<InventoryPageComponent>;
  let entitiesService: EntitiesManager;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     declarations: [InventoryPageComponent],
                                     providers: [EntitiesManager]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    const gameMap: GameMap = new MapBuilder().build();
    entitiesService = TestBed.get(EntitiesManager);

    let player: Player = EntitiesFactory.getInstance()
                                        .createEntity(EntityType.PLAYER) as Player;
    player = player.setRace(RaceFactory.getInstance()
                                       .createRace(RaceType.HUMAN))
                   .setGameClass(GameClassFactory.getInstance()
                                                 .createGameClass(ClassType.BARBARIAN))
                   .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
    const letter: string = player.addToInventory(GameObjectFactory.create(GameObjectType.ARMOR, 'shield'));
    player.equipInventory(letter);
    entitiesService.setPlayer(player);

    fixture = TestBed.createComponent(InventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should display inventory for player', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.innerText)
      .toContain('Shield');
  });
});
