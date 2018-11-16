import { TestBed } from '@angular/core/testing';

import { DisplayService } from './display.service';

describe('RotDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayService = TestBed.get(DisplayService);
    expect(service).toBeTruthy();
  });
});
