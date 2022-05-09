import {TestBed} from '@angular/core/testing';

import {DisplayEngine} from './display-engine';

describe('RotDisplayService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: DisplayEngine = new DisplayEngine();
        expect(service)
            .toBeTruthy();
    });
});
