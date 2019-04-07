import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILehrer } from 'app/shared/model/lehrer.model';
import { LehrerService } from './lehrer.service';

@Component({
    selector: 'jhi-lehrer-delete-dialog',
    templateUrl: './lehrer-delete-dialog.component.html'
})
export class LehrerDeleteDialogComponent {
    lehrer: ILehrer;

    constructor(protected lehrerService: LehrerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lehrerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lehrerListModification',
                content: 'Deleted an lehrer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lehrer-delete-popup',
    template: ''
})
export class LehrerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lehrer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LehrerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.lehrer = lehrer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/lehrer', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/lehrer', { outlets: { popup: null } }]);
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
