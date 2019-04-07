/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KurssystemImstTestModule } from '../../../test.module';
import { SchuelerDeleteDialogComponent } from 'app/entities/schueler/schueler-delete-dialog.component';
import { SchuelerService } from 'app/entities/schueler/schueler.service';

describe('Component Tests', () => {
    describe('Schueler Management Delete Component', () => {
        let comp: SchuelerDeleteDialogComponent;
        let fixture: ComponentFixture<SchuelerDeleteDialogComponent>;
        let service: SchuelerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [SchuelerDeleteDialogComponent]
            })
                .overrideTemplate(SchuelerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SchuelerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchuelerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
