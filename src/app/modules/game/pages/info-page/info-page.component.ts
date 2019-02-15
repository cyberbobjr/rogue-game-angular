import {Component, OnInit} from '@angular/core';
import {AttributesFactory} from '../../../../core/factories/attributes-factory';
import {EntitiesService} from '../../services/entities.service';
import {Player} from '../../../../core/classes/entities/player';

@Component({
             selector: 'app-info-page',
             templateUrl: './info-page.component.html',
             styleUrls: ['./info-page.component.css']
           })
export class InfoPageComponent implements OnInit {
  message: string = null;
  attributes: Array<string> = [];
  player: Player = null;

  constructor(private _entitiesService: EntitiesService) {
  }

  ngOnInit() {
    this.player = this._entitiesService.getPlayer();
    for (const [attribute, value] of AttributesFactory.getAttributes()) {
      this.attributes.push(attribute);
    }
  }
}
