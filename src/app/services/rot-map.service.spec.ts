import { TestBed } from '@angular/core/testing';

import { RotMapService } from './rot-map.service';

describe('RotMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotMapService = TestBed.get(RotMapService);
    expect(service).toBeTruthy();
  });
});
