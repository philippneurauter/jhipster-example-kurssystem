/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { KurssystemImstTestModule } from '../../../test.module';
import { KursDeleteDialogComponent } from 'app/entities/kurs/kurs-delete-dialog.component';
import { KursService } from 'app/entities/kurs/kurs.service';

describe('Component Tests', () => {
    describe('Kurs Management Delete Component', () => {
        let comp: KursDeleteDialogComponent;
        let fixture: ComponentFixture<KursDeleteDialogComponent>;
        let service: KursService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [KursDeleteDialogComponent]
            })
                .overrideTemplate(KursDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KursDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KursService);
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
