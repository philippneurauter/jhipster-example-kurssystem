import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { KurssystemImstSharedModule } from 'app/shared';
import {
    KursComponent,
    KursDetailComponent,
    KursUpdateComponent,
    KursDeletePopupComponent,
    KursDeleteDialogComponent,
    kursRoute,
    kursPopupRoute
} from './';

const ENTITY_STATES = [...kursRoute, ...kursPopupRoute];

@NgModule({
    imports: [KurssystemImstSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [KursComponent, KursDetailComponent, KursUpdateComponent, KursDeleteDialogComponent, KursDeletePopupComponent],
    entryComponents: [KursComponent, KursUpdateComponent, KursDeleteDialogComponent, KursDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KurssystemImstKursModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
