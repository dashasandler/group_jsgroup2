const Page = require('./Page');

class PeoplePage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    open() {
        return super.open('./users');
    }
}

module.exports = new PeoplePage();