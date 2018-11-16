import { TestBed } from '@angular/core/testing';

import { MapEngine } from './map-engine.service';

describe('RotMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapEngine = TestBed.get(MapEngine);
    expect(service).toBeTruthy();
  });
});
