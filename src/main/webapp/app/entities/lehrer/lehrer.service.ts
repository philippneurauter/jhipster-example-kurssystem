import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILehrer } from 'app/shared/model/lehrer.model';

type EntityResponseType = HttpResponse<ILehrer>;
type EntityArrayResponseType = HttpResponse<ILehrer[]>;

@Injectable({ providedIn: 'root' })
export class LehrerService {
    public resourceUrl = SERVER_API_URL + 'api/lehrers';

    constructor(protected http: HttpClient) {}

    create(lehrer: ILehrer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(lehrer);
        return this.http
            .post<ILehrer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(lehrer: ILehrer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(lehrer);
        return this.http
            .put<ILehrer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILehrer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILehrer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(lehrer: ILehrer): ILehrer {
        const copy: ILehrer = Object.assign({}, lehrer, {
            geburtsdatum: lehrer.geburtsdatum != null && lehrer.geburtsdatum.isValid() ? lehrer.geburtsdatum.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.geburtsdatum = res.body.geburtsdatum != null ? moment(res.body.geburtsdatum) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((lehrer: ILehrer) => {
                lehrer.geburtsdatum = lehrer.geburtsdatum != null ? moment(lehrer.geburtsdatum) : null;
            });
        }
        return res;
    }
}
