import {Component, OnInit} from '@angular/core';
import {Utility} from '../../../core/classes/utility';
import {DiceService} from '../services/dice.service';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {EntityType} from '../../../core/enums/entity-type.enum';
import {Barbarian} from '../../../core/rules/barbarian';
import {Player} from '../../../core/classes/entities/player';
import {StorageService} from '../../game/services/storage.service';
import {Entity} from '../../../core/classes/base/entity';
import {MapEngine} from '../../game/services/map-engine.service';
import {IDice} from '../interface/idice';

@Component({
             selector: 'app-create-page',
             templateUrl: './create-page.component.html',
             styleUrls: ['./create-page.component.css']
           })
export class CreatePageComponent implements OnInit {
  nbDices = 4;

  constructor(private _diceService: DiceService, private _storageService: StorageService, private _mapEngine: MapEngine) {
  }

  ngOnInit() {
  }

  onDice() {
    let totalScore = 0;
    let dicesScore: Array<IDice> = [];
    for (let i = 0; i < this.nbDices; i++) {
      dicesScore.push({id: dicesScore.length + 1, value: Utility.rolldice(6), type: 6});
    }
    dicesScore = dicesScore.sort((v1, v2) => v2.value - v1.value);
    for (let i = 0; i < 3; i++) {
      totalScore += dicesScore[i].value;
    }
    this._diceService.dicesScore.push({id: this._diceService.dicesScore.length + 1, value: totalScore, type: 6});
  }

  onSave() {
    const player: Player = <Player>EntitiesFactory.createEntity(EntityType.PLAYER);
    player.hitDice = Barbarian.getHitDice();

    player.constitution = this._diceService.abilityScore['constitution'];
    player.strength = this._diceService.abilityScore['strength'];
    player.wisdom = this._diceService.abilityScore['wisdom'];
    player.intelligence = this._diceService.abilityScore['intelligence'];
    player.dexterity = this._diceService.abilityScore['dexterity'];
    player.charisma = this._diceService.abilityScore['charisma'];

    this._storageService.savePlayer(<Entity>player);
  }
}
