import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { ILehrer } from 'app/shared/model/lehrer.model';
import { LehrerService } from './lehrer.service';

@Component({
    selector: 'jhi-lehrer-update',
    templateUrl: './lehrer-update.component.html'
})
export class LehrerUpdateComponent implements OnInit {
    lehrer: ILehrer;
    isSaving: boolean;
    geburtsdatumDp: any;

    constructor(protected lehrerService: LehrerService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lehrer }) => {
            this.lehrer = lehrer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.lehrer.id !== undefined) {
            this.subscribeToSaveResponse(this.lehrerService.update(this.lehrer));
        } else {
            this.subscribeToSaveResponse(this.lehrerService.create(this.lehrer));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILehrer>>) {
        result.subscribe((res: HttpResponse<ILehrer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
