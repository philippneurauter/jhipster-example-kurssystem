import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKurs } from 'app/shared/model/kurs.model';

type EntityResponseType = HttpResponse<IKurs>;
type EntityArrayResponseType = HttpResponse<IKurs[]>;

@Injectable({ providedIn: 'root' })
export class KursService {
    public resourceUrl = SERVER_API_URL + 'api/kurs';

    constructor(protected http: HttpClient) {}

    create(kurs: IKurs): Observable<EntityResponseType> {
        return this.http.post<IKurs>(this.resourceUrl, kurs, { observe: 'response' });
    }

    update(kurs: IKurs): Observable<EntityResponseType> {
        return this.http.put<IKurs>(this.resourceUrl, kurs, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IKurs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IKurs[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
