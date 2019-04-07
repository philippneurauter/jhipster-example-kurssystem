import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { KurssystemImstSharedModule } from 'app/shared';
import {
    SchuelerComponent,
    SchuelerDetailComponent,
    SchuelerUpdateComponent,
    SchuelerDeletePopupComponent,
    SchuelerDeleteDialogComponent,
    schuelerRoute,
    schuelerPopupRoute
} from './';

const ENTITY_STATES = [...schuelerRoute, ...schuelerPopupRoute];

@NgModule({
    imports: [KurssystemImstSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SchuelerComponent,
        SchuelerDetailComponent,
        SchuelerUpdateComponent,
        SchuelerDeleteDialogComponent,
        SchuelerDeletePopupComponent
    ],
    entryComponents: [SchuelerComponent, SchuelerUpdateComponent, SchuelerDeleteDialogComponent, SchuelerDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KurssystemImstSchuelerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
