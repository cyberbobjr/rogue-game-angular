import {Component, OnInit} from '@angular/core';
import {EntitiesService} from '../../services/entities.service';

@Component({
             selector: 'app-inventory-page',
             templateUrl: './inventory-page.component.html',
             styleUrls: ['./inventory-page.component.css']
           })
export class InventoryPageComponent implements OnInit {
  constructor(private _entitiesService: EntitiesService) {

  }

  ngOnInit() {

  }
}
