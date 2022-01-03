const Page = require('./Page');

class ProblemCreatePage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get backspaceButton() {
        return $("//div[@class='btn btn-link']");
    }

    get problemTitle() {
        return $("//input[@id='title']");
    }

    get problemCompany() {
        return $("//input[@id='company']");
    }

    get chooseGoogleCompany() {
        return $("//li[@id='company-option-1']");
    }

    get problemPosition() {
        return $("//input[@id='position']");
    }

    get problemContent() {
        return $('//textarea');
    }

    get saveButton() {
        return $("//button[@type='submit']");
    }

    get cancelButton() {
        return $('button.mr-3');
    }


    async createProblem(title, company, position, content) {
        await this.open();
        await this.problemTitle.setValue(title);
        await this.problemCompany.click();
        await this.chooseGoogleCompany.click();
        await this.problemPosition.setValue(position);
        await this.problemContent.setValue(content);
        await this.saveButton.click();



    }

    open() {
        return super.open('./problems/create');
    }
}

module.exports = new ProblemCreatePage();