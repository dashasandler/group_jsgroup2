const Page = require('./Page');
const NavBar = require('./NavMenu.page')

class PublicationsPage extends Page {
    get pageTitle() {
        return $('.MuiTypography-root');
    }

    get buttonAddPublication(){
        return $('.mb-3>a>button');
    }

    get publicationsList() {
        return $(".pb-4");
    }

    get publication() {
        return $(".mb-4");
    }

    get textPublicationOwner(){
        return $('//a[contains(@href,"user")]/div[contains(@class,"linked-text")]');
//        return $('.mb-4 a>.linked-text');
    }

    get textPublicationDate(){
        return $('.mb-4 div.ant-row>div:nth-of-type(2)>div:nth-of-type(2));
    }

    get textPublicationTitle(){
        return $('//a[contains(@href,"publication/")]/div')
//      return $('a[href="publication/")]>div') //doesn't work
    }

    get textPublicationDescription(){
        return $('.description')
    }

    open() {
        return super.open('./publications');
    }
}

module.exports = new PublicationsPage();