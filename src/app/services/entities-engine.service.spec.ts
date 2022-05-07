import { TestBed } from '@angular/core/testing';

import { EntitiesEngine } from './entities-engine.service';

describe('EntitiesEngine', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntitiesEngine = TestBed.get(EntitiesEngine);
    expect(service).toBeTruthy();
  });
});
