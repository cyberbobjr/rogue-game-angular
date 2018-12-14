import {Component, OnInit} from '@angular/core';
import {EventLog} from '../../../../core/classes/event-log';
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
  private _player: Player = null;

  constructor(private _entitiesService: EntitiesService) {
  }

  ngOnInit() {
    this._player = this._entitiesService.player as Player;
    for (const [attribute, value] of AttributesFactory.getAttributes()) {
      this.attributes.push(attribute);
    }

    EventLog.getInstance()
      .message$
      .subscribe((message: string) => {
        this.message = message;
      });
  }

}
