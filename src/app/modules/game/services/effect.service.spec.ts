import {TestBed} from '@angular/core/testing';

import {EffectEngine} from './effect-engine.service';

describe('EffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EffectEngine = TestBed.get(EffectEngine);
    expect(service)
      .toBeTruthy();
  });
});
