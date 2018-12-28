import {Component, OnInit} from '@angular/core';
import {Utility} from '../../../core/classes/utility';
import {DiceService} from '../services/dice.service';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {EntityType} from '../../../core/enums/entity-type.enum';
import {StorageService} from '../../game/services/storage.service';
import {Entity} from '../../../core/classes/base/entity';
import {IDice} from '../interface/idice';
import {ClassType} from '../../../core/enums/class-type.enum';
import {GameClassFactory} from '../../../core/factories/game-class-factory';
import {RaceFactory} from '../../../core/factories/race-factory';
import {RaceType} from '../../../core/enums/race-type.enum';
import {Router} from '@angular/router';
import {GameClass} from '../../../core/classes/base/game-class';
import {RaceClass} from '../../../core/classes/base/race';

@Component({
             selector: 'app-create-page',
             templateUrl: './create-page.component.html',
             styleUrls: ['./create-page.component.css']
           })
export class CreatePageComponent implements OnInit {
  nbDices = 4;
  attributesKeys: Array<string> = [];

  constructor(private _diceService: DiceService,
              private _storageService: StorageService,
              private _router: Router) {
  }

  ngOnInit() {
    for (const attributes of this._diceService.attributesScore.keys()) {
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
    this._diceService.dicesScore.sort((v1: IDice, v2: IDice) => v2.value - v1.value);
  }

  onSave() {
    let player: Entity = <Entity>EntitiesFactory.getInstance()
                                                .createEntity(EntityType.PLAYER);
    player.attributes = this._diceService.attributesScore;
    const gameClass: GameClass = GameClassFactory.getInstance()
                                                 .createGameClass(ClassType.BARBARIAN);
    const gameRace: RaceClass = RaceFactory.getInstance()
                                       .createRace(RaceType.HUMAN);

    player = player.setRace(gameRace)
                   .setGameClass(gameClass);

    StorageService.savePlayer(<Entity>player);
    this._router.navigateByUrl('main');
  }
}
