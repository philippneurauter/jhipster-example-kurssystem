import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKurs } from 'app/shared/model/kurs.model';
import { KursService } from './kurs.service';

@Component({
    selector: 'jhi-kurs-delete-dialog',
    templateUrl: './kurs-delete-dialog.component.html'
})
export class KursDeleteDialogComponent {
    kurs: IKurs;

    constructor(protected kursService: KursService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kursService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'kursListModification',
                content: 'Deleted an kurs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kurs-delete-popup',
    template: ''
})
export class KursDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kurs }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KursDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.kurs = kurs;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/kurs', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/kurs', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
