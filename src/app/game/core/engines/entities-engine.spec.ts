import {TestBed} from '@angular/core/testing';

import {EntitiesEngine} from './entities-engine';

describe('EntitiesEngine', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: EntitiesEngine = new EntitiesEngine();
        expect(service).toBeTruthy();
    });
});
