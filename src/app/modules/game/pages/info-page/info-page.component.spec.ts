import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InfoPageComponent} from './info-page.component';
import {Player} from '@core/core/entities/player';
import {GameClassFactory} from '@core/factories/game-class-factory';
import {ClassType} from '@core/enums/class-type.enum';
import {RaceFactory} from '@core/factories/race-factory';
import {RaceType} from '@core/enums/race-type.enum';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {GameEntities} from '@core/core/base/game-entities';
import {Entity} from '@core/core/base/entity';
import {AttributeSystem} from '@core/core/base/AttributeSystem';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';

describe('InfoPageComponent', () => {
    let component: InfoPageComponent;
    let fixture: ComponentFixture<InfoPageComponent>;
    let player: Entity;
    beforeEach(waitForAsync(() => {
        const attributes: AttributeSystem = new AttributeSystem();
        attributes.set('dexterity', 10);
        player = new Player().setGameClass(GameClassFactory.getInstance()
                                                           .createGameClass(ClassType.BARBARIAN))
                             .setRace(RaceFactory.getInstance()
                                                 .createRace(RaceType.HUMAN))
                             .setAttributes(attributes);

        TestBed.configureTestingModule({
            imports: [
                NgxSmartModalModule.forRoot(),
                RouterTestingModule
            ],
            declarations: [InfoPageComponent]
        })
               .compileComponents();
        const gameEntities: GameEntities = new GameEntities();
        const entitiesEngine: EntitiesEngine = new EntitiesEngine();
        entitiesEngine.setGameEntities(gameEntities);
        entitiesEngine.setPlayer(player as Player);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoPageComponent);
        component = fixture.componentInstance;
        component.player = player as Player;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    it('should display info about player', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML)
            .toContain('dexterity : 10');
    });
});
