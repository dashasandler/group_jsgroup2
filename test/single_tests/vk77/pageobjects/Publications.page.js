const Page = require('./Page');
const SideBarMenu = require('./NavigationSideBarMenu')

class PublicationsPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }
    get sideBarMenu(){
        return new SideBarMenu();
    }
    get addPublication(){
        return $('a>button');
    }
    get publicationTitle(){
        return $('div.pb-4>div:nth-child(2)>div>a')
    }
    get publicationDesciption(){
        return $('div:nth-child(2)>div>.description')
    }

    open() {
        return super.open('./publications');
    }
}

module.exports = new PublicationsPage();