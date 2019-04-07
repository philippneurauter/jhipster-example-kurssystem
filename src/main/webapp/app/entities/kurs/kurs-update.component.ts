import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKurs } from 'app/shared/model/kurs.model';
import { KursService } from './kurs.service';
import { ILehrer } from 'app/shared/model/lehrer.model';
import { LehrerService } from 'app/entities/lehrer';
import { ISchueler } from 'app/shared/model/schueler.model';
import { SchuelerService } from 'app/entities/schueler';

@Component({
    selector: 'jhi-kurs-update',
    templateUrl: './kurs-update.component.html'
})
export class KursUpdateComponent implements OnInit {
    kurs: IKurs;
    isSaving: boolean;

    lehrers: ILehrer[];

    schuelers: ISchueler[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected kursService: KursService,
        protected lehrerService: LehrerService,
        protected schuelerService: SchuelerService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ kurs }) => {
            this.kurs = kurs;
        });
        this.lehrerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILehrer[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILehrer[]>) => response.body)
            )
            .subscribe((res: ILehrer[]) => (this.lehrers = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.schuelerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchueler[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchueler[]>) => response.body)
            )
            .subscribe((res: ISchueler[]) => (this.schuelers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.kurs.id !== undefined) {
            this.subscribeToSaveResponse(this.kursService.update(this.kurs));
        } else {
            this.subscribeToSaveResponse(this.kursService.create(this.kurs));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IKurs>>) {
        result.subscribe((res: HttpResponse<IKurs>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLehrerById(index: number, item: ILehrer) {
        return item.id;
    }

    trackSchuelerById(index: number, item: ISchueler) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
