/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KurssystemImstTestModule } from '../../../test.module';
import { LehrerDetailComponent } from 'app/entities/lehrer/lehrer-detail.component';
import { Lehrer } from 'app/shared/model/lehrer.model';

describe('Component Tests', () => {
    describe('Lehrer Management Detail Component', () => {
        let comp: LehrerDetailComponent;
        let fixture: ComponentFixture<LehrerDetailComponent>;
        const route = ({ data: of({ lehrer: new Lehrer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [LehrerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LehrerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LehrerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.lehrer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
