const Page = require('./Page');
const {newProblem} = require("../../../../test_data/testdata");

class ProblemsPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get newProblemButton() {
        return $("//button/text()[contains(.,'New Problem')]/..");
    }

    get newProblemTitle() {
        return $(`//a[contains(text(),"${newProblem.title}")]`);
    }


    open() {
        return super.open('./problems');
    }
}

module.exports = new ProblemsPage();