const Page = require('./Page');

class PublicationViewPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get hamburgerMenu() {
        return $('button#nav-bar-toggle');
    }

    get publicationTitle() {
        return $('.ant-row.mb-3+h2')
    }

    get editButton() {
        return $('div.ant-row> button[type=\"button\"]');
    }

    get likeButton() {
        return $('//button[@id="like-btn"]');
    }

    get likesNumber() {
        return $('//span[@class="ml-1"]');
    }


    open() {
        return super.open('./publication');
    }
}

module.exports = new PublicationViewPage();