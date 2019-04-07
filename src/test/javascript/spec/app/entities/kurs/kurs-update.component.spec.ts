/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KurssystemImstTestModule } from '../../../test.module';
import { KursUpdateComponent } from 'app/entities/kurs/kurs-update.component';
import { KursService } from 'app/entities/kurs/kurs.service';
import { Kurs } from 'app/shared/model/kurs.model';

describe('Component Tests', () => {
    describe('Kurs Management Update Component', () => {
        let comp: KursUpdateComponent;
        let fixture: ComponentFixture<KursUpdateComponent>;
        let service: KursService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [KursUpdateComponent]
            })
                .overrideTemplate(KursUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KursUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KursService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Kurs(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.kurs = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Kurs();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.kurs = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
