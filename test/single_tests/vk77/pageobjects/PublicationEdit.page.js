const Page = require('./Page');
const SideBarMenu = require('./NavigationSideBarMenu')

class EditPublicationPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get sideBarMenu() {
        return new SideBarMenu();
    }

    get publicationTitle() {
        return $('#title');
    }

    get publicationImage() {
        return $('#image');
    }

    get publicationDescription() {
        return $('#description');
    }

    get publicationContent() {
        return $('//textarea');
    }

    get saveButton() {
        return $('button[type="submit"]');
    }

    get cancelButton() {
        return $('button.mr-3');
    }

    async updatePublication(title, image, description, content) {
       // await this.open();
        await this.publicationTitle.keys(['CONTROL','A'],'DELETE');
        await this.publicationTitle.setValue(title);
        await this.publicationImage.setValue(image);
        await this.publicationDescription.setValue(description);
        await this.publicationContent.setValue(content);
        await this.saveButton.click();
    }

    open() {
        return super.open('/publication/edit');
    }
}

module.exports = new EditPublicationPage();