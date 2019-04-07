/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SchuelerComponentsPage, SchuelerDeleteDialog, SchuelerUpdatePage } from './schueler.page-object';

const expect = chai.expect;

describe('Schueler e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let schuelerUpdatePage: SchuelerUpdatePage;
    let schuelerComponentsPage: SchuelerComponentsPage;
    let schuelerDeleteDialog: SchuelerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Schuelers', async () => {
        await navBarPage.goToEntity('schueler');
        schuelerComponentsPage = new SchuelerComponentsPage();
        await browser.wait(ec.visibilityOf(schuelerComponentsPage.title), 5000);
        expect(await schuelerComponentsPage.getTitle()).to.eq('kurssystemImstApp.schueler.home.title');
    });

    it('should load create Schueler page', async () => {
        await schuelerComponentsPage.clickOnCreateButton();
        schuelerUpdatePage = new SchuelerUpdatePage();
        expect(await schuelerUpdatePage.getPageTitle()).to.eq('kurssystemImstApp.schueler.home.createOrEditLabel');
        await schuelerUpdatePage.cancel();
    });

    it('should create and save Schuelers', async () => {
        const nbButtonsBeforeCreate = await schuelerComponentsPage.countDeleteButtons();

        await schuelerComponentsPage.clickOnCreateButton();
        await promise.all([
            schuelerUpdatePage.setSchuelernameInput('schuelername'),
            schuelerUpdatePage.setKlasseInput('klasse'),
            schuelerUpdatePage.setGeburtsdatumInput('2000-12-31')
            // schuelerUpdatePage.kursSelectLastOption(),
        ]);
        expect(await schuelerUpdatePage.getSchuelernameInput()).to.eq('schuelername');
        expect(await schuelerUpdatePage.getKlasseInput()).to.eq('klasse');
        expect(await schuelerUpdatePage.getGeburtsdatumInput()).to.eq('2000-12-31');
        await schuelerUpdatePage.save();
        expect(await schuelerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await schuelerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Schueler', async () => {
        const nbButtonsBeforeDelete = await schuelerComponentsPage.countDeleteButtons();
        await schuelerComponentsPage.clickOnLastDeleteButton();

        schuelerDeleteDialog = new SchuelerDeleteDialog();
        expect(await schuelerDeleteDialog.getDialogTitle()).to.eq('kurssystemImstApp.schueler.delete.question');
        await schuelerDeleteDialog.clickOnConfirmButton();

        expect(await schuelerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
