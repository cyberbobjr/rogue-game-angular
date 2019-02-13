import {TestBed} from '@angular/core/testing';

import {GameEngineService} from './game-engine.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('GameEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
                                                    imports: [SharedModule,
                                                              RouterTestingModule]
                                                  }));

  it('should be created', () => {
    const service: GameEngineService = TestBed.get(GameEngineService);
    expect(service)
      .toBeTruthy();
  });
});
