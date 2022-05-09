import {TestBed} from '@angular/core/testing';

import {GameCommands} from './GameCommands';
import {Command} from '@core/interfaces/command';
import {MoveE} from '@core/core/commands/move';

describe('GameCommands', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: GameCommands = new GameCommands(null);
        expect(service)
            .toBeTruthy();
    });

    it('move command should be accessible', () => {
        const service: GameCommands = new GameCommands(null);
        const moveECommand: Command = service.ArrowRight;
        expect(moveECommand instanceof MoveE)
            .toBeTruthy();
    });
});
