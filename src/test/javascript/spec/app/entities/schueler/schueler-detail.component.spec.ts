/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KurssystemImstTestModule } from '../../../test.module';
import { SchuelerDetailComponent } from 'app/entities/schueler/schueler-detail.component';
import { Schueler } from 'app/shared/model/schueler.model';

describe('Component Tests', () => {
    describe('Schueler Management Detail Component', () => {
        let comp: SchuelerDetailComponent;
        let fixture: ComponentFixture<SchuelerDetailComponent>;
        const route = ({ data: of({ schueler: new Schueler(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [SchuelerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SchuelerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SchuelerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.schueler).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
