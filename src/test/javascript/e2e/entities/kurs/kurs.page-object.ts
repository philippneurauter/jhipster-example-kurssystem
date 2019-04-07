import { element, by, ElementFinder } from 'protractor';

export class KursComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-kurs div table .btn-danger'));
    title = element.all(by.css('jhi-kurs div h2#page-heading span')).first();

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

export class KursUpdatePage {
    pageTitle = element(by.id('jhi-kurs-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    kursnameInput = element(by.id('field_kursname'));
    kursartInput = element(by.id('field_kursart'));
    kurseinheitInput = element(by.id('field_kurseinheit'));
    kurskapazitaetInput = element(by.id('field_kurskapazitaet'));
    lehrerSelect = element(by.id('field_lehrer'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setKursnameInput(kursname) {
        await this.kursnameInput.sendKeys(kursname);
    }

    async getKursnameInput() {
        return this.kursnameInput.getAttribute('value');
    }

    async setKursartInput(kursart) {
        await this.kursartInput.sendKeys(kursart);
    }

    async getKursartInput() {
        return this.kursartInput.getAttribute('value');
    }

    async setKurseinheitInput(kurseinheit) {
        await this.kurseinheitInput.sendKeys(kurseinheit);
    }

    async getKurseinheitInput() {
        return this.kurseinheitInput.getAttribute('value');
    }

    async setKurskapazitaetInput(kurskapazitaet) {
        await this.kurskapazitaetInput.sendKeys(kurskapazitaet);
    }

    async getKurskapazitaetInput() {
        return this.kurskapazitaetInput.getAttribute('value');
    }

    async lehrerSelectLastOption() {
        await this.lehrerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async lehrerSelectOption(option) {
        await this.lehrerSelect.sendKeys(option);
    }

    getLehrerSelect(): ElementFinder {
        return this.lehrerSelect;
    }

    async getLehrerSelectedOption() {
        return this.lehrerSelect.element(by.css('option:checked')).getText();
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

export class KursDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-kurs-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-kurs'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
