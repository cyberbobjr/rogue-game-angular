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
    this._diceService.dicesScore = [];
    for (let i = 0; i < this.nbDices; i++) {
      this._diceService.dicesScore.push({id: this._diceService.dicesScore.length + 1, value: Utility.rolldice(6), type: 6});
    }
    this._diceService.dicesScore = this._diceService.dicesScore.sort((v1, v2) => v2.value - v1.value);
    for (let i = 0; i < 3; i++) {
      totalScore += this._diceService.dicesScore[i].value;
    }
    this._diceService.abilityScore.push({id: this._diceService.abilityScore.length + 1, value: totalScore});
  }

  onSave() {
    const player: Player = <Player>EntitiesFactory.createEntity(EntityType.PLAYER);
    player.hitDice = Barbarian.getHitDice();
    player.position = this._mapEngine.getStartPosition();
    this._storageService.savePlayer(<Entity>player);
  }
}
