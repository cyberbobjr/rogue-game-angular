import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageComponent} from './main-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {InventoryModule} from '../../../inventory/inventory.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MainMapComponent} from '../main-map/main-map.component';
import {InfoPageComponent} from '../info-page/info-page.component';
import {InventoryPageComponent} from '../inventory-page/inventory-page.component';
import {LogPageComponent} from '../log-page/log-page.component';
import {StorageService} from '../../services/storage.service';
import {EntitiesService} from '../../services/entities.service';
import {Player} from '../../../../core/classes/entities/player';
import {GameClassFactory} from '../../../../core/factories/game-class-factory';
import {ClassType} from '../../../../core/enums/class-type.enum';
import {RaceFactory} from '../../../../core/factories/race-factory';
import {RaceType} from '../../../../core/enums/race-type.enum';
import {GameMap} from '../../../../core/classes/base/game-map';
import {MapBuilder} from '../../../../core/factories/map-builder';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let storageService: StorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               NgxSmartModalModule.forRoot(),
                                               InventoryModule,
                                               RouterTestingModule],
                                     declarations: [MainPageComponent,
                                                    MainMapComponent,
                                                    InfoPageComponent,
                                                    InventoryPageComponent,
                                                    LogPageComponent],
                                     providers: [StorageService,
                                                 EntitiesService]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    storageService = TestBed.get(StorageService);
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should create with player and map in storage', () => {
    const player: Player = new Player().setGameClass(GameClassFactory.getInstance()
                                                                     .createGameClass(ClassType.BARBARIAN))
                                       .setRace(RaceFactory.getInstance()
                                                           .createRace(RaceType.HUMAN));
    const map: GameMap = new MapBuilder().build();
    player.setMapLevelAndPosition(map.level, map.entryPosition);
    storageService.saveMapWithEntities(map, []);
    storageService.savePlayer(player);
    fixture.detectChanges();
    expect(component)
      .toBeTruthy();
  });
});
