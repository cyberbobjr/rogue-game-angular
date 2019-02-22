import {TestBed} from '@angular/core/testing';

import {GameEngine} from './game-engine.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('GameEngine', () => {
  beforeEach(() => TestBed.configureTestingModule({
                                                    imports: [SharedModule,
                                                              RouterTestingModule]
                                                  }));

  it('should be created', () => {
    const service: GameEngine = TestBed.get(GameEngine);
    expect(service)
      .toBeTruthy();
  });
});
