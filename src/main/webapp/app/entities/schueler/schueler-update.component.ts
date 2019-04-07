import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISchueler } from 'app/shared/model/schueler.model';
import { SchuelerService } from './schueler.service';
import { IKurs } from 'app/shared/model/kurs.model';
import { KursService } from 'app/entities/kurs';

@Component({
    selector: 'jhi-schueler-update',
    templateUrl: './schueler-update.component.html'
})
export class SchuelerUpdateComponent implements OnInit {
    schueler: ISchueler;
    isSaving: boolean;

    kurs: IKurs[];
    geburtsdatumDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected schuelerService: SchuelerService,
        protected kursService: KursService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schueler }) => {
            this.schueler = schueler;
        });
        this.kursService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IKurs[]>) => mayBeOk.ok),
                map((response: HttpResponse<IKurs[]>) => response.body)
            )
            .subscribe((res: IKurs[]) => (this.kurs = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.schueler.id !== undefined) {
            this.subscribeToSaveResponse(this.schuelerService.update(this.schueler));
        } else {
            this.subscribeToSaveResponse(this.schuelerService.create(this.schueler));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchueler>>) {
        result.subscribe((res: HttpResponse<ISchueler>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackKursById(index: number, item: IKurs) {
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
