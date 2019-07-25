import {TestBed} from '@angular/core/testing';

import {DisplayEngine} from './display-engine.service';

describe('RotDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayEngine = TestBed.get(DisplayEngine);
    expect(service)
      .toBeTruthy();
  });
});
