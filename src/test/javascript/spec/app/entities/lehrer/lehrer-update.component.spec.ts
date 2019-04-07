/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { KurssystemImstTestModule } from '../../../test.module';
import { LehrerUpdateComponent } from 'app/entities/lehrer/lehrer-update.component';
import { LehrerService } from 'app/entities/lehrer/lehrer.service';
import { Lehrer } from 'app/shared/model/lehrer.model';

describe('Component Tests', () => {
    describe('Lehrer Management Update Component', () => {
        let comp: LehrerUpdateComponent;
        let fixture: ComponentFixture<LehrerUpdateComponent>;
        let service: LehrerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [LehrerUpdateComponent]
            })
                .overrideTemplate(LehrerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LehrerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LehrerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Lehrer(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.lehrer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Lehrer();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.lehrer = entity;
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
