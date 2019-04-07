/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KursComponentsPage, KursDeleteDialog, KursUpdatePage } from './kurs.page-object';

const expect = chai.expect;

describe('Kurs e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let kursUpdatePage: KursUpdatePage;
    let kursComponentsPage: KursComponentsPage;
    let kursDeleteDialog: KursDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Kurs', async () => {
        await navBarPage.goToEntity('kurs');
        kursComponentsPage = new KursComponentsPage();
        await browser.wait(ec.visibilityOf(kursComponentsPage.title), 5000);
        expect(await kursComponentsPage.getTitle()).to.eq('kurssystemImstApp.kurs.home.title');
    });

    it('should load create Kurs page', async () => {
        await kursComponentsPage.clickOnCreateButton();
        kursUpdatePage = new KursUpdatePage();
        expect(await kursUpdatePage.getPageTitle()).to.eq('kurssystemImstApp.kurs.home.createOrEditLabel');
        await kursUpdatePage.cancel();
    });

    it('should create and save Kurs', async () => {
        const nbButtonsBeforeCreate = await kursComponentsPage.countDeleteButtons();

        await kursComponentsPage.clickOnCreateButton();
        await promise.all([
            kursUpdatePage.setKursnameInput('kursname'),
            kursUpdatePage.setKursartInput('kursart'),
            kursUpdatePage.setKurseinheitInput('5'),
            kursUpdatePage.setKurskapazitaetInput('kurskapazitaet'),
            kursUpdatePage.lehrerSelectLastOption()
        ]);
        expect(await kursUpdatePage.getKursnameInput()).to.eq('kursname');
        expect(await kursUpdatePage.getKursartInput()).to.eq('kursart');
        expect(await kursUpdatePage.getKurseinheitInput()).to.eq('5');
        expect(await kursUpdatePage.getKurskapazitaetInput()).to.eq('kurskapazitaet');
        await kursUpdatePage.save();
        expect(await kursUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await kursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Kurs', async () => {
        const nbButtonsBeforeDelete = await kursComponentsPage.countDeleteButtons();
        await kursComponentsPage.clickOnLastDeleteButton();

        kursDeleteDialog = new KursDeleteDialog();
        expect(await kursDeleteDialog.getDialogTitle()).to.eq('kurssystemImstApp.kurs.delete.question');
        await kursDeleteDialog.clickOnConfirmButton();

        expect(await kursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
