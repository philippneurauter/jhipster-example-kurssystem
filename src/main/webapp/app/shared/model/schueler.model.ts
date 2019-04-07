import { Moment } from 'moment';
import { IKurs } from 'app/shared/model/kurs.model';

export interface ISchueler {
    id?: number;
    schuelername?: string;
    klasse?: string;
    geburtsdatum?: Moment;
    kurs?: IKurs[];
}

export class Schueler implements ISchueler {
    constructor(
        public id?: number,
        public schuelername?: string,
        public klasse?: string,
        public geburtsdatum?: Moment,
        public kurs?: IKurs[]
    ) {}
}
