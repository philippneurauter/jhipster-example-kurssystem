/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KurssystemImstTestModule } from '../../../test.module';
import { LehrerDeleteDialogComponent } from 'app/entities/lehrer/lehrer-delete-dialog.component';
import { LehrerService } from 'app/entities/lehrer/lehrer.service';

describe('Component Tests', () => {
    describe('Lehrer Management Delete Component', () => {
        let comp: LehrerDeleteDialogComponent;
        let fixture: ComponentFixture<LehrerDeleteDialogComponent>;
        let service: LehrerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [LehrerDeleteDialogComponent]
            })
                .overrideTemplate(LehrerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LehrerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LehrerService);
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
