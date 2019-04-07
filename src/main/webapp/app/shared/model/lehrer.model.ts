import { Moment } from 'moment';
import { IKurs } from 'app/shared/model/kurs.model';

export interface ILehrer {
    id?: number;
    lehrername?: string;
    geburtsdatum?: Moment;
    faecher?: string;
    vorstand?: string;
    lehrernames?: IKurs[];
}

export class Lehrer implements ILehrer {
    constructor(
        public id?: number,
        public lehrername?: string,
        public geburtsdatum?: Moment,
        public faecher?: string,
        public vorstand?: string,
        public lehrernames?: IKurs[]
    ) {}
}
