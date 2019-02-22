import {Component, OnInit} from '@angular/core';
import {AttributesFactory} from '../../../../core/factories/attributes-factory';
import {EntitiesManager} from '../../services/entities-manager.service';

@Component({
             selector: 'app-info-page',
             templateUrl: './info-page.component.html',
             styleUrls: ['./info-page.component.css']
           })
export class InfoPageComponent implements OnInit {
  message: string = null;
  attributes: Array<string> = [];

  get entitiesService(): EntitiesManager {
    return this._entitiesService;
  }

  constructor(private _entitiesService: EntitiesManager) {
  }

  ngOnInit() {
    for (const [attribute, value] of AttributesFactory.getAttributes()) {
      this.attributes.push(attribute);
    }
  }
}
