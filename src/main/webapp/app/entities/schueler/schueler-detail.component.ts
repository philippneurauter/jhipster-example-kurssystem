import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchueler } from 'app/shared/model/schueler.model';

@Component({
    selector: 'jhi-schueler-detail',
    templateUrl: './schueler-detail.component.html'
})
export class SchuelerDetailComponent implements OnInit {
    schueler: ISchueler;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schueler }) => {
            this.schueler = schueler;
        });
    }

    previousState() {
        window.history.back();
    }
}
