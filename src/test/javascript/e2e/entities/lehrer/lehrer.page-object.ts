import { element, by, ElementFinder } from 'protractor';

export class LehrerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-lehrer div table .btn-danger'));
    title = element.all(by.css('jhi-lehrer div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LehrerUpdatePage {
    pageTitle = element(by.id('jhi-lehrer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    lehrernameInput = element(by.id('field_lehrername'));
    geburtsdatumInput = element(by.id('field_geburtsdatum'));
    faecherInput = element(by.id('field_faecher'));
    vorstandInput = element(by.id('field_vorstand'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLehrernameInput(lehrername) {
        await this.lehrernameInput.sendKeys(lehrername);
    }

    async getLehrernameInput() {
        return this.lehrernameInput.getAttribute('value');
    }

    async setGeburtsdatumInput(geburtsdatum) {
        await this.geburtsdatumInput.sendKeys(geburtsdatum);
    }

    async getGeburtsdatumInput() {
        return this.geburtsdatumInput.getAttribute('value');
    }

    async setFaecherInput(faecher) {
        await this.faecherInput.sendKeys(faecher);
    }

    async getFaecherInput() {
        return this.faecherInput.getAttribute('value');
    }

    async setVorstandInput(vorstand) {
        await this.vorstandInput.sendKeys(vorstand);
    }

    async getVorstandInput() {
        return this.vorstandInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class LehrerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-lehrer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-lehrer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
