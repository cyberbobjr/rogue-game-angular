import { TestBed } from '@angular/core/testing';

import { RotDisplayService } from './rot-display.service';

describe('RotDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotDisplayService = TestBed.get(RotDisplayService);
    expect(service).toBeTruthy();
  });
});
