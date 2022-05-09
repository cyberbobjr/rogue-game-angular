import { TestBed } from '@angular/core/testing';

import { KeyboardEngine } from './keyboard-engine.service';

describe('KeyboardEngineService', () => {
  let service: KeyboardEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
