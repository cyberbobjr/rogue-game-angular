import {TestBed} from '@angular/core/testing';
import {Player} from './player';
import {JsonEntity} from '../../interfaces/json-interfaces';

const playerJsonData: JsonEntity = {
  'id': 'player',
  'type': 1,
  'speed': 1,
  'xp': 0,
  'size': 'm',
  'name': 'Player',
  'position': {'_x': 55, '_y': 20},
  'sprite': {'color': '#ffffff', 'bgColor': '#000000', 'light': true, 'visibility': 0, 'character': '@'},
  'strength': 17,
  'dexterity': 16,
  'constitution': 16,
  'intelligence': 11,
  'wisdom': 7,
  'charisma': 7,
  'ac': 13,
  'hp': 15,
  'gp': 51,
  'hitDice': 12,
  'inventory': [],
  'level': 1,
  'maxHp': 15,
  'equipped': [
    [1, 'a'],
    [0, 'b']
  ],
  'race': 'Human',
  'gameClass': 'Barbarian'
};

describe('Player', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const player: Player = new Player();
    expect(player)
      .toBeTruthy();
  });

  it('can be initiated with jsonData', () => {
    const player: Player = Player.fromJSON(playerJsonData);
    expect(player.race)
      .toEqual('Human');
    expect(player.gameClass)
      .toEqual('Barbarian');
  });

  it('should generate correct JSON', () => {
    const player: Player = new Player();
    const playerJson: string = player.toJSON();
  });
});
