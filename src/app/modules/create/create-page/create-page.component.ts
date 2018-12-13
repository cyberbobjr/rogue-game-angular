import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Utility} from '../../../core/classes/utility';
import {DiceService} from '../services/dice.service';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {EntityType} from '../../../core/enums/entity-type.enum';
import {Player} from '../../../core/classes/entities/player';
import {StorageService} from '../../game/services/storage.service';
import {Entity} from '../../../core/classes/base/entity';
import {IDice} from '../interface/idice';
import {ClassType} from '../../../core/enums/class-type.enum';
import {GameClassFactory} from '../../../core/factories/game-class-factory';
import {RaceFactory} from '../../../core/factories/race-factory';
import {RaceType} from '../../../core/enums/race-type.enum';
import {IGameClass} from '../../../core/interfaces/i-game-class';

@Component({
             selector: 'app-create-page',
             templateUrl: './create-page.component.html',
             styleUrls: ['./create-page.component.css']
           })
export class CreatePageComponent implements OnInit {
  nbDices = 4;
  attributesKeys: Array<string> = [];

  constructor(private _diceService: DiceService,
              private _storageService: StorageService) {
  }

  ngOnInit() {
    for (const attributes of this._diceService.abilityScore.keys()) {
      this.attributesKeys.push(attributes);
    }
  }

  onDice() {
    for (let jet = 0; jet < 6; jet++) {
      let totalScore = 0;
      let dicesScore: Array<number> = [];
      for (let i = 0; i < this.nbDices; i++) {
        dicesScore.push(Utility.rolldice(6));
      }
      dicesScore = dicesScore.sort((v1, v2) => v2 - v1);
      for (let i = 0; i < 3; i++) {
        totalScore += dicesScore[i];
      }
      this._diceService.addDiceScore(totalScore);
    }
  }

  onSave() {
    const gameClass: IGameClass = GameClassFactory.createGameClass(ClassType.BARBARIAN);
    const player: Entity = (<Entity>EntitiesFactory.createEntity(EntityType.PLAYER))
      .setClass(gameClass)
      .setRace(RaceFactory.createRace(RaceType.HUMAN));

    player.attributes = this._diceService.abilityScore;
    player.hp = player.hitDice + player.constitution;
    player.gp = gameClass.getGp();

    this._storageService.savePlayer(<Entity>player);
  }

  onPlay() {

  }
}
