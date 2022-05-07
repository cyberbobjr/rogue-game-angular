import Dexie from 'dexie';

export class AppDB extends Dexie {
    private static dbname = 'TsRogue';
    private dbVersion = 3;
    Player: any;
    Map: any;

    constructor() {
        super(AppDB.dbname);
        this.version(this.dbVersion)
            .stores({
                Map: 'level',
                Player: '++'
            });
    }
}

export const db = new AppDB();
