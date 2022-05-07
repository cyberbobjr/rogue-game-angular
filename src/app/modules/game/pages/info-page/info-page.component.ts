import {Component, OnInit} from '@angular/core';
import {AttributesFactory} from '../../../../core/factories/attributes-factory';
import {EntitiesEngine} from '../../../../services/entities-engine.service';

@Component({
             selector: 'app-info-page',
             templateUrl: './info-page.component.html',
             styleUrls: ['./info-page.component.scss']
           })
export class InfoPageComponent implements OnInit {
  message: string = null;
  attributes: Array<string> = [];

  get entitiesService(): EntitiesEngine {
    return this._entitiesService;
  }

  constructor(private _entitiesService: EntitiesEngine) {
  }

  ngOnInit() {
    for (const [attribute, value] of AttributesFactory.getAttributes()) {
      this.attributes.push(attribute);
    }
  }
}
