import {TestBed} from '@angular/core/testing';

import {CommandsService} from './commands.service';
import {Command} from '../core/interfaces/command';
import {MoveE} from '../core/classes/commands/move';

describe('CommandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandsService = TestBed.get(CommandsService);
    expect(service)
      .toBeTruthy();
  });

  it('move command should be accessible', () => {
    const service: CommandsService = TestBed.get(CommandsService);
    const moveECommand: Command = service.ArrowRight;
    expect(moveECommand instanceof MoveE)
      .toBeTruthy();
  });
});
