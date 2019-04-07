/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KurssystemImstTestModule } from '../../../test.module';
import { LehrerComponent } from 'app/entities/lehrer/lehrer.component';
import { LehrerService } from 'app/entities/lehrer/lehrer.service';
import { Lehrer } from 'app/shared/model/lehrer.model';

describe('Component Tests', () => {
    describe('Lehrer Management Component', () => {
        let comp: LehrerComponent;
        let fixture: ComponentFixture<LehrerComponent>;
        let service: LehrerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [LehrerComponent],
                providers: []
            })
                .overrideTemplate(LehrerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LehrerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LehrerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Lehrer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.lehrers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
