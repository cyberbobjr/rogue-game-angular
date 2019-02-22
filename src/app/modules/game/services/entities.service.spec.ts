import { TestBed } from '@angular/core/testing';

import { EntitiesManager } from './entities-manager.service';

describe('EntitiesManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntitiesManager = TestBed.get(EntitiesManager);
    expect(service).toBeTruthy();
  });
});
