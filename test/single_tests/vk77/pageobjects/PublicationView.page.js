const Page = require('./Page');
const SideBarMenu = require('./NavigationSideBarMenu')

class PublicationViewPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }
    get sideBarMenu(){
        return new SideBarMenu();
    }
    get publicationTitle(){
        return $('.flex-row.mb-3+h2')
    }
    get publicationDescription(){
        return $('.flex-row.mb-3+h2+div')
    }
    get publicationContent(){
        return $('.flex-row.mb-3+h2+div+div>div>p')
    }
    get editButton(){
        return $('div.flex-row> button[type="button"]');
    }

    open() {
        return super.open('./publication');
    }
}

module.exports = new PublicationViewPage();