const Page = require('./Page');

class CreatePublicationPage extends Page {
    get pageTitle() {
        return $('div>h6');
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
    
    open() {
        return super.open('/publications/create');
        //return super.open('./publications/create');
    }
}

module.exports = new CreatePublicationPage();