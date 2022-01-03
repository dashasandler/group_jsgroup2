const Page = require('./Page');

class ProblemViewPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get hamburgerMenu() {
        return $('button#nav-bar-toggle');
    }

    get problemTitle() {
        return $('//h3')
    }

    get editButton() {
        return $('div.ant-row> button[type="button"]');
    }

    get addNewSolution() {
        return $("//text()[contains(.,\'Add New Solution\')]/..");
    }


    open() {
        return super.open('./problems');
    }
}

module.exports = new ProblemViewPage();