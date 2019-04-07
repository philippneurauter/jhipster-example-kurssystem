import { ILehrer } from 'app/shared/model/lehrer.model';
import { ISchueler } from 'app/shared/model/schueler.model';

export interface IKurs {
    id?: number;
    kursname?: string;
    kursart?: string;
    kurseinheit?: number;
    kurskapazitaet?: string;
    lehrer?: ILehrer;
    kursnames?: ISchueler[];
}

export class Kurs implements IKurs {
    constructor(
        public id?: number,
        public kursname?: string,
        public kursart?: string,
        public kurseinheit?: number,
        public kurskapazitaet?: string,
        public lehrer?: ILehrer,
        public kursnames?: ISchueler[]
    ) {}
}
