import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoPageComponent} from './info-page.component';
import {Player} from '../../../../core/classes/entities/player';
import {GameClassFactory} from '../../../../core/factories/game-class-factory';
import {ClassType} from '../../../../core/enums/class-type.enum';
import {RaceFactory} from '../../../../core/factories/race-factory';
import {RaceType} from '../../../../core/enums/race-type.enum';
import {AttributesFactory} from '../../../../core/factories/attributes-factory';
import {EntitiesEngine} from '../../services/entities-engine.service';
import {GameEntities} from '../../../../core/classes/base/game-entities';
import {Entity} from '../../../../core/classes/base/entity';
import {AttributeSystem} from '../../../../core/classes/base/AttributeSystem';

describe('InfoPageComponent', () => {
  let component: InfoPageComponent;
  let fixture: ComponentFixture<InfoPageComponent>;

  beforeEach(async(() => {
    const attributes: AttributeSystem = new AttributeSystem();
    attributes.set('dexterity', 10);
    const player: Entity = new Player().setGameClass(GameClassFactory.getInstance()
                                                                     .createGameClass(ClassType.BARBARIAN))
                                       .setRace(RaceFactory.getInstance()
                                                           .createRace(RaceType.HUMAN))
                                       .setAttributes(attributes);

    TestBed.configureTestingModule({
                                     declarations: [InfoPageComponent]
                                   })
           .compileComponents();
    const gameEntities: GameEntities = new GameEntities();
    const entitiesService: EntitiesEngine = TestBed.get(EntitiesEngine);
    entitiesService.setGameEntities(gameEntities);
    entitiesService.setPlayer(player as Player);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageComponent);
    component = fixture.componentInstance;
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
