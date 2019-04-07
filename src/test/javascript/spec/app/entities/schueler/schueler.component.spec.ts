/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KurssystemImstTestModule } from '../../../test.module';
import { SchuelerComponent } from 'app/entities/schueler/schueler.component';
import { SchuelerService } from 'app/entities/schueler/schueler.service';
import { Schueler } from 'app/shared/model/schueler.model';

describe('Component Tests', () => {
    describe('Schueler Management Component', () => {
        let comp: SchuelerComponent;
        let fixture: ComponentFixture<SchuelerComponent>;
        let service: SchuelerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [SchuelerComponent],
                providers: []
            })
                .overrideTemplate(SchuelerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SchuelerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchuelerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Schueler(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.schuelers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
