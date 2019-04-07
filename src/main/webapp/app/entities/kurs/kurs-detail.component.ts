import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKurs } from 'app/shared/model/kurs.model';

@Component({
    selector: 'jhi-kurs-detail',
    templateUrl: './kurs-detail.component.html'
})
export class KursDetailComponent implements OnInit {
    kurs: IKurs;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kurs }) => {
            this.kurs = kurs;
        });
    }

    previousState() {
        window.history.back();
    }
}
