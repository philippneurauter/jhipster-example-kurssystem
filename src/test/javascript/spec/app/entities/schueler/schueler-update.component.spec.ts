/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KurssystemImstTestModule } from '../../../test.module';
import { SchuelerUpdateComponent } from 'app/entities/schueler/schueler-update.component';
import { SchuelerService } from 'app/entities/schueler/schueler.service';
import { Schueler } from 'app/shared/model/schueler.model';

describe('Component Tests', () => {
    describe('Schueler Management Update Component', () => {
        let comp: SchuelerUpdateComponent;
        let fixture: ComponentFixture<SchuelerUpdateComponent>;
        let service: SchuelerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [SchuelerUpdateComponent]
            })
                .overrideTemplate(SchuelerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SchuelerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchuelerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Schueler(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.schueler = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Schueler();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.schueler = entity;
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
