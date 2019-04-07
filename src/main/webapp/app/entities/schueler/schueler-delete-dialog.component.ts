import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchueler } from 'app/shared/model/schueler.model';
import { SchuelerService } from './schueler.service';

@Component({
    selector: 'jhi-schueler-delete-dialog',
    templateUrl: './schueler-delete-dialog.component.html'
})
export class SchuelerDeleteDialogComponent {
    schueler: ISchueler;

    constructor(protected schuelerService: SchuelerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schuelerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'schuelerListModification',
                content: 'Deleted an schueler'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-schueler-delete-popup',
    template: ''
})
export class SchuelerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schueler }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SchuelerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.schueler = schueler;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/schueler', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/schueler', { outlets: { popup: null } }]);
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
