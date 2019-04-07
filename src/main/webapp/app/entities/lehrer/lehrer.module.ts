import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { KurssystemImstSharedModule } from 'app/shared';
import {
    LehrerComponent,
    LehrerDetailComponent,
    LehrerUpdateComponent,
    LehrerDeletePopupComponent,
    LehrerDeleteDialogComponent,
    lehrerRoute,
    lehrerPopupRoute
} from './';

const ENTITY_STATES = [...lehrerRoute, ...lehrerPopupRoute];

@NgModule({
    imports: [KurssystemImstSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LehrerComponent, LehrerDetailComponent, LehrerUpdateComponent, LehrerDeleteDialogComponent, LehrerDeletePopupComponent],
    entryComponents: [LehrerComponent, LehrerUpdateComponent, LehrerDeleteDialogComponent, LehrerDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KurssystemImstLehrerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
