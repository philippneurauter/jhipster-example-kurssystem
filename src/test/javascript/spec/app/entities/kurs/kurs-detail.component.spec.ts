/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KurssystemImstTestModule } from '../../../test.module';
import { KursDetailComponent } from 'app/entities/kurs/kurs-detail.component';
import { Kurs } from 'app/shared/model/kurs.model';

describe('Component Tests', () => {
    describe('Kurs Management Detail Component', () => {
        let comp: KursDetailComponent;
        let fixture: ComponentFixture<KursDetailComponent>;
        const route = ({ data: of({ kurs: new Kurs(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [KurssystemImstTestModule],
                declarations: [KursDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KursDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KursDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.kurs).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
