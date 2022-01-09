const Page = require('./Page');
const SideBarMenu = require('./NavigationSideBarMenu')


class CompaniesPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get sideBarMenu (){
        return SideBarMenu;
    }
    open() {
        return super.open('./companies');
    }
}

module.exports = new CompaniesPage();