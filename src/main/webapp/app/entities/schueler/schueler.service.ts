import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchueler } from 'app/shared/model/schueler.model';

type EntityResponseType = HttpResponse<ISchueler>;
type EntityArrayResponseType = HttpResponse<ISchueler[]>;

@Injectable({ providedIn: 'root' })
export class SchuelerService {
    public resourceUrl = SERVER_API_URL + 'api/schuelers';

    constructor(protected http: HttpClient) {}

    create(schueler: ISchueler): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schueler);
        return this.http
            .post<ISchueler>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(schueler: ISchueler): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schueler);
        return this.http
            .put<ISchueler>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISchueler>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchueler[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(schueler: ISchueler): ISchueler {
        const copy: ISchueler = Object.assign({}, schueler, {
            geburtsdatum:
                schueler.geburtsdatum != null && schueler.geburtsdatum.isValid() ? schueler.geburtsdatum.format(DATE_FORMAT) : null
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
            res.body.forEach((schueler: ISchueler) => {
                schueler.geburtsdatum = schueler.geburtsdatum != null ? moment(schueler.geburtsdatum) : null;
            });
        }
        return res;
    }
}
