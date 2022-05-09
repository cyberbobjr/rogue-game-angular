import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MainPageComponent} from './main-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {InventoryModule} from '../../../inventory/inventory.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MainMapComponent} from '../main-map/main-map.component';
import {InfoPageComponent} from '../info-page/info-page.component';
import {InventoryPageComponent} from '../inventory-page/inventory-page.component';
import {LogPageComponent} from '../log-page/log-page.component';
import {StorageEngine} from '@services/storage-engine.service';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {Player} from '@core/core/entities/player';
import {GameClassFactory} from '@core/factories/game-class-factory';
import {ClassType} from '@core/enums/class-type.enum';
import {RaceFactory} from '@core/factories/race-factory';
import {RaceType} from '@core/enums/race-type.enum';
import {GameMapImp} from '@core/core/base/game-map-imp';
import {MapBuilder} from '@core/factories/map-builder';
import {EntityBuilder} from '@core/factories/entity-builder';
import {GameEntities} from '@core/core/base/game-entities';
import {DebugPageComponent} from '../debug-page/debug-page.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('MainPageComponent', () => {
    let component: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;
    let storageService: StorageEngine;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule,
                NgxSmartModalModule.forRoot(),
                InventoryModule,
                ReactiveFormsModule,
                RouterTestingModule],
            declarations: [MainPageComponent,
                MainMapComponent,
                DebugPageComponent,
                InfoPageComponent,
                InventoryPageComponent,
                LogPageComponent],
            providers: [StorageEngine,
                EntitiesEngine]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        storageService = TestBed.get(StorageEngine);
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
        const map: GameMapImp = new MapBuilder().build();
        player.setMapLevelAndPosition(map.level, map.entryPosition);
        const gameEntities: GameEntities = EntityBuilder.generateEntitiesOnMap([], 5, map);
        storageService.saveMap(map, gameEntities);
        storageService.savePlayer(player);
        fixture.detectChanges();
        expect(component)
            .toBeTruthy();
    });
});
