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

    fieldNameColumn(column) {
        return $(`//div[@class="MuiDataGrid-columnHeaderTitle css-cc8tf1" and contains(text(),"${column}")]`);
    }

    get problemNameFieldMenuIcon() {
        return $('(//div[@class="MuiDataGrid-menuIcon"]/button)[1]');
    }

    get listMenuFilter() {
        return $('//li[contains(text(),"Filter")]');
    }

    get listMenuHide() {
        return $('//li[contains(text(),"Hide")]');
    }

    get iconSortProblemName() {
        return $('//div[@data-field="Problem name"and@tabindex="0"]');
    }

    get inputFilterValue() {
        return $('//input[@placeholder="Filter value"]');
    }

    get chooseOperators() {
        return $('//div[@class="MuiFormControl-root css-75e5xq"]//select');
    }

    get iconColumns() {
        return $('//button[@aria-label="Select columns"]');
    }

    findColumnsByName(column) {
        return $(`//span[contains(text(),"${column}")]`);
    }

    get showAllColumns() {
        return $('//button[contains(text(),"Show all")]');
    }

    get hideAllColumns() {
        return $('//button[contains(text(),"Hide all")]');
    }

    get emptyTable(){
        return $('//div[@class="MuiDataGrid-cell"]')
    }

    get iconDensity() {
        return $('//button[@aria-label="Density"]');
    }

    get densityCompact(){
        return $('(//div[@class="MuiListItemIcon-root css-1f8bwsm"])[1]');
    }

    get densityStandart(){
        return $('(//div[@class="MuiListItemIcon-root css-1f8bwsm"])[2]');
    }

    get densityComfortable(){
        return $('(//div[@class="MuiListItemIcon-root css-1f8bwsm"])[3]');
    }

    get iconFilter() {
        return $('//button[contains(.,"Filters")]');
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

     problemRowsTableInColumn(column) {
         return $$(`//div[@data-field="${column}"and@tabindex="-1"]`)
     }

    problemRowByRowindexInColumn(i, column){
        return $(`//div[@data-rowindex="${i}"]/div[@data-field="${column}"]/a`)
    }

    get firstRow(){
        return $('//div[@role="cell"]');
    }

    get nextPageArrow(){
        return $('//button[@title="Go to next page"]')
    }

    get previousPageArrow() {
        return $('//button[@title="Go to previous page"]')
    }

    get paginationNote() {
        return $('//p[@class="MuiTablePagination-displayedRows css-1chpzqh"]')
    }

    open() {
        return super.open('./problems');
    }
}

module.exports = new ProblemsPage();