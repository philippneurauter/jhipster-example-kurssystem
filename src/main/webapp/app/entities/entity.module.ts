import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'lehrer',
                loadChildren: './lehrer/lehrer.module#KurssystemImstLehrerModule'
            },
            {
                path: 'kurs',
                loadChildren: './kurs/kurs.module#KurssystemImstKursModule'
            },
            {
                path: 'schueler',
                loadChildren: './schueler/schueler.module#KurssystemImstSchuelerModule'
            },
            {
                path: 'kurs',
                loadChildren: './kurs/kurs.module#KurssystemImstKursModule'
            },
            {
                path: 'schueler',
                loadChildren: './schueler/schueler.module#KurssystemImstSchuelerModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KurssystemImstEntityModule {}
