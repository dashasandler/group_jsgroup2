const Page = require('./Page');

class ProblemsPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    open() {
        return super.open('./problems');
    }
}

module.exports = new ProblemsPage();