import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILehrer } from 'app/shared/model/lehrer.model';
import { AccountService } from 'app/core';
import { LehrerService } from './lehrer.service';

@Component({
    selector: 'jhi-lehrer',
    templateUrl: './lehrer.component.html'
})
export class LehrerComponent implements OnInit, OnDestroy {
    lehrers: ILehrer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected lehrerService: LehrerService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.lehrerService
            .query()
            .pipe(
                filter((res: HttpResponse<ILehrer[]>) => res.ok),
                map((res: HttpResponse<ILehrer[]>) => res.body)
            )
            .subscribe(
                (res: ILehrer[]) => {
                    this.lehrers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLehrers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILehrer) {
        return item.id;
    }

    registerChangeInLehrers() {
        this.eventSubscriber = this.eventManager.subscribe('lehrerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
