import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoPageComponent} from './info-page.component';
import {Player} from '../../../../core/classes/entities/player';
import {GameClassFactory} from '../../../../core/factories/game-class-factory';
import {ClassType} from '../../../../core/enums/class-type.enum';
import {RaceFactory} from '../../../../core/factories/race-factory';
import {RaceType} from '../../../../core/enums/race-type.enum';
import {AttributesFactory} from '../../../../core/factories/attributes-factory';
import {EntitiesManager} from '../../services/entities-manager.service';

describe('InfoPageComponent', () => {
  let component: InfoPageComponent;
  let fixture: ComponentFixture<InfoPageComponent>;

  beforeEach(async(() => {
    const attributes: Map<string, number> = new Map<string, number>(AttributesFactory.getAttributes());
    attributes.set('dexterity', 10);
    const player: Player = new Player().setGameClass(GameClassFactory.getInstance()
                                                                     .createGameClass(ClassType.BARBARIAN))
                                       .setRace(RaceFactory.getInstance()
                                                           .createRace(RaceType.HUMAN))
                                       .setAbilities(attributes) as Player;

    TestBed.configureTestingModule({
                                     declarations: [InfoPageComponent]
                                   })
           .compileComponents();
    const entitiesService: EntitiesManager = TestBed.get(EntitiesManager);
    entitiesService.setPlayer(player);
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
