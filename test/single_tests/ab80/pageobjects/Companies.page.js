const Page = require('./Page');

class CompaniesPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }
    open() {
        return super.open('./companies');
    }
}

module.exports = new CompaniesPage();