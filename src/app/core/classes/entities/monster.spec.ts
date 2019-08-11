import {TestBed} from '@angular/core/testing';
import {Monster} from './monster';
import {EntitiesFactory} from '../../factories/entities-factory';
import {EntityType} from '../../enums/entity-type.enum';
import {JsonMonster} from '../../interfaces/json-interfaces';
import {Position} from '../base/position';
import {Entity} from '../base/entity';

let jsonMonster: JsonMonster = null;

describe('Monster', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const monster: Monster = new Monster();
    expect(monster)
      .toBeTruthy();
  });

  it('can be generated by factory', () => {
    const monster: Monster = EntitiesFactory.getInstance()
                                            .createEntity(EntityType.MONSTER, new Position(0, 0)) as Monster;
    expect(monster)
      .toBeDefined();
    expect(monster.name)
      .toBeDefined();
    jsonMonster = monster.toJSON();
  });

  it('can be initiated with jsonData', () => {
    const monster: Entity = EntitiesFactory.getInstance()
                                           .createEntityFromJson(jsonMonster);
    expect(JSON.stringify(jsonMonster))
      .toEqual(JSON.stringify(monster));
  });
});
