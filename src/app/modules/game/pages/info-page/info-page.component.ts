import {Component, Input, OnInit} from '@angular/core';
import {AttributesFactory} from '@core/factories/attributes-factory';
import {Player} from '@core/core/entities/player';

@Component({
    selector: 'app-info-page',
    templateUrl: './info-page.component.html',
    styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
    @Input() player: Player;
    message: string = null;
    attributes: Array<string> = [];

    constructor() {
    }

    ngOnInit() {
        for (const [attribute, value] of AttributesFactory.getAttributes()) {
            this.attributes.push(attribute);
        }
    }
}
