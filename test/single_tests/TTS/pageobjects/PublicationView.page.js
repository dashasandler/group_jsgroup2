const Page = require('./Page');

class PublicationViewPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get hamburgerMenu() {
        return $('button#nav-bar-toggle');
    }

    get publicationTitle() {
        return $('//h2')
    }

    get publicationVeiwDescription() {
        return $('div.p-3>div:nth-child(3)')
    }

    get publicationVeiwContent() {
        return $('//div[@class="markdown-body"]')
    }

    get editButton() {
        return $('div.mb-3> button[type="button"]');
    }

    get returnArrow() {
        return $('div.mb-3>a');
    }

    get likeButton() {
        return $('button#like-btn');
    }

    get likeCounter() {
        return $('span.ml-1');
    }

    get commentButton() {
        return $('button#comment-btn');
    }

    get commentTextArea() {
        return $('textarea#comment-input');
    }

    get commentSendButton() {
        return $('button#send-btn');
    }

    get commentPosted() {
        return $('//div/span');
    }

    open() {
        return super.open('./publication');
    }
}

module.exports = new PublicationViewPage();