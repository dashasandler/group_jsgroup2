const Page = require('./Page');
const {newProblem} = require("../test_data/testdata");

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

    get problemNameField() {
        return $('//div[@class="MuiDataGrid-columnHeaderTitle css-cc8tf1" and contains(text(),"Problem name")]');
    }

    get problemNameFieldMenuIcon() {
        return $('(//div[@class="MuiDataGrid-menuIcon"]/button)[1]');
    }

    get listMenuFilter() {
        return $('//li[contains(text(),"Filter")]');
    }

    get inputFilterValue() {
        return $('//input[@placeholder="Filter value"]');
    }

    get iconFilter() {
        return $('//div[@class ="MuiDataGrid-toolbarContainer css-13vjeky"]/button[2]');
    }

    get iconFilterNumber() {
        return $('//span[@class="MuiBadge-root css-1rzb3uu"]/span');
    }

    get deleteFilterButton() {
        return $('//button[@title="Delete"]');
    }

    problemRowsContainTextInColumn (text, column) {
        return $$(`//div[@data-field="${column}"]/a[normalize-space("${text}")]`);
    }



    open() {
        return super.open('./problems');
    }
}

module.exports = new ProblemsPage();