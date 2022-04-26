import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

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
import {EntitiesEngine} from '../../services/entities-engine.service';
import {GameEntities} from '../../../../core/classes/base/game-entities';

describe('InventoryPageComponent', () => {
  let component: InventoryPageComponent;
  let fixture: ComponentFixture<InventoryPageComponent>;
  let entitiesService: EntitiesEngine;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
                                     declarations: [InventoryPageComponent],
                                     providers: [EntitiesEngine]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    const gameEntities: GameEntities = new GameEntities();

    entitiesService = TestBed.get(EntitiesEngine);
    entitiesService.setGameEntities(gameEntities);

    let player: Player = EntitiesFactory.getInstance()
                                        .createEntity(EntityType.PLAYER) as Player;
    player = player.setRace(RaceFactory.getInstance()
                                       .createRace(RaceType.HUMAN))
                   .setGameClass(GameClassFactory.getInstance()
                                                 .createGameClass(ClassType.BARBARIAN));
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
