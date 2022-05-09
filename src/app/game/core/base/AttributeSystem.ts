import {JsonAbilities} from '../../interfaces/json-interfaces';
import {AttributesFactory} from '../../factories/attributes-factory';

export class AttributeSystem {
    private _attributes: Map<string, number> = new Map<string, number>(AttributesFactory.getAttributes());

    constructor(jsonAttributes?: JsonAbilities) {
        if (jsonAttributes) {
            this._buildFromJson(jsonAttributes);
        }
    }

    private _buildFromJson(jsonAttributes: JsonAbilities) {
        for (const key of Object.keys(jsonAttributes)) {
            this._attributes.set(key, jsonAttributes[key]);
        }
    }

    keys(): IterableIterator<string> {
        return this._attributes.keys();
    }

    get(attributes: string) {
        return this._attributes.get(attributes);
    }

    toJSON(): JsonAbilities {
        return {
            strength: this._attributes.get('strength'),
            dexterity: this._attributes.get('dexterity'),
            constitution: this._attributes.get('constitution'),
            intelligence: this._attributes.get('intelligence'),
            wisdom: this._attributes.get('wisdom'),
            charisma: this._attributes.get('charisma')
        };
    }

    set(attribute: string, value: number) {
        this._attributes.set(attribute, value);
    }
}
