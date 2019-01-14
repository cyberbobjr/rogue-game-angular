import {Component, OnInit} from '@angular/core';
import {AttributesFactory} from '../../../../core/factories/attributes-factory';
import {EntitiesService} from '../../services/entities.service';

@Component({
             selector: 'app-info-page',
             templateUrl: './info-page.component.html',
             styleUrls: ['./info-page.component.css']
           })
export class InfoPageComponent implements OnInit {
  message: string = null;
  attributes: Array<string> = [];

  constructor(private _entitiesService: EntitiesService) {
  }

  ngOnInit() {
    for (const [attribute, value] of AttributesFactory.getAttributes()) {
      this.attributes.push(attribute);
    }
  }

}
