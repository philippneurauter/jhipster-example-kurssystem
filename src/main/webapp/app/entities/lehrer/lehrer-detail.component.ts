import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILehrer } from 'app/shared/model/lehrer.model';

@Component({
    selector: 'jhi-lehrer-detail',
    templateUrl: './lehrer-detail.component.html'
})
export class LehrerDetailComponent implements OnInit {
    lehrer: ILehrer;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lehrer }) => {
            this.lehrer = lehrer;
        });
    }

    previousState() {
        window.history.back();
    }
}
