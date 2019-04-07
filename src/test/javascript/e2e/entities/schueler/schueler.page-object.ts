import { element, by, ElementFinder } from 'protractor';

export class SchuelerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-schueler div table .btn-danger'));
    title = element.all(by.css('jhi-schueler div h2#page-heading span')).first();

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

export class SchuelerUpdatePage {
    pageTitle = element(by.id('jhi-schueler-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    schuelernameInput = element(by.id('field_schuelername'));
    klasseInput = element(by.id('field_klasse'));
    geburtsdatumInput = element(by.id('field_geburtsdatum'));
    kursSelect = element(by.id('field_kurs'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSchuelernameInput(schuelername) {
        await this.schuelernameInput.sendKeys(schuelername);
    }

    async getSchuelernameInput() {
        return this.schuelernameInput.getAttribute('value');
    }

    async setKlasseInput(klasse) {
        await this.klasseInput.sendKeys(klasse);
    }

    async getKlasseInput() {
        return this.klasseInput.getAttribute('value');
    }

    async setGeburtsdatumInput(geburtsdatum) {
        await this.geburtsdatumInput.sendKeys(geburtsdatum);
    }

    async getGeburtsdatumInput() {
        return this.geburtsdatumInput.getAttribute('value');
    }

    async kursSelectLastOption() {
        await this.kursSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async kursSelectOption(option) {
        await this.kursSelect.sendKeys(option);
    }

    getKursSelect(): ElementFinder {
        return this.kursSelect;
    }

    async getKursSelectedOption() {
        return this.kursSelect.element(by.css('option:checked')).getText();
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

export class SchuelerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-schueler-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-schueler'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
