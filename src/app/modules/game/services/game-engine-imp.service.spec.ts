import {TestBed} from '@angular/core/testing';

import {GameEngineImp} from './game-engine-imp.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('GameEngine', () => {
  beforeEach(() => TestBed.configureTestingModule({
                                                    imports: [SharedModule,
                                                              RouterTestingModule]
                                                  }));

  it('should be created', () => {
    const service: GameEngineImp = TestBed.get(GameEngineImp);
    expect(service)
      .toBeTruthy();
  });
});
