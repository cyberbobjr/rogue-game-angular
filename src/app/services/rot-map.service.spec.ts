import { TestBed } from '@angular/core/testing';

import { RotMapEngine } from './rot-map-engine.service';

describe('RotMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotMapEngine = TestBed.get(RotMapEngine);
    expect(service).toBeTruthy();
  });
});
