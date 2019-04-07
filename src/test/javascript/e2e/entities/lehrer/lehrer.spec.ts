/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LehrerComponentsPage, LehrerDeleteDialog, LehrerUpdatePage } from './lehrer.page-object';

const expect = chai.expect;

describe('Lehrer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let lehrerUpdatePage: LehrerUpdatePage;
    let lehrerComponentsPage: LehrerComponentsPage;
    let lehrerDeleteDialog: LehrerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Lehrers', async () => {
        await navBarPage.goToEntity('lehrer');
        lehrerComponentsPage = new LehrerComponentsPage();
        await browser.wait(ec.visibilityOf(lehrerComponentsPage.title), 5000);
        expect(await lehrerComponentsPage.getTitle()).to.eq('kurssystemImstApp.lehrer.home.title');
    });

    it('should load create Lehrer page', async () => {
        await lehrerComponentsPage.clickOnCreateButton();
        lehrerUpdatePage = new LehrerUpdatePage();
        expect(await lehrerUpdatePage.getPageTitle()).to.eq('kurssystemImstApp.lehrer.home.createOrEditLabel');
        await lehrerUpdatePage.cancel();
    });

    it('should create and save Lehrers', async () => {
        const nbButtonsBeforeCreate = await lehrerComponentsPage.countDeleteButtons();

        await lehrerComponentsPage.clickOnCreateButton();
        await promise.all([
            lehrerUpdatePage.setLehrernameInput('lehrername'),
            lehrerUpdatePage.setGeburtsdatumInput('2000-12-31'),
            lehrerUpdatePage.setFaecherInput('faecher'),
            lehrerUpdatePage.setVorstandInput('vorstand')
        ]);
        expect(await lehrerUpdatePage.getLehrernameInput()).to.eq('lehrername');
        expect(await lehrerUpdatePage.getGeburtsdatumInput()).to.eq('2000-12-31');
        expect(await lehrerUpdatePage.getFaecherInput()).to.eq('faecher');
        expect(await lehrerUpdatePage.getVorstandInput()).to.eq('vorstand');
        await lehrerUpdatePage.save();
        expect(await lehrerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await lehrerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Lehrer', async () => {
        const nbButtonsBeforeDelete = await lehrerComponentsPage.countDeleteButtons();
        await lehrerComponentsPage.clickOnLastDeleteButton();

        lehrerDeleteDialog = new LehrerDeleteDialog();
        expect(await lehrerDeleteDialog.getDialogTitle()).to.eq('kurssystemImstApp.lehrer.delete.question');
        await lehrerDeleteDialog.clickOnConfirmButton();

        expect(await lehrerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
