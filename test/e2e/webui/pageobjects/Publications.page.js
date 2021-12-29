const Page = require('./Page');

class PublicationsPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }
    get hamburgerMenu(){
        return $('button#nav-bar-toggle');
    }
    get peopleMenuItem(){
        return $('#people');
    }
    get companiesMenuItem(){
        return $('#companies');
    }
    get addPublication(){
        return $('a>button');
    }
    get publicationTitle(){
        return $('div.pb-4>div:nth-child(2)>div>a')
    }

    get publicationIdLink(){
        return $("(//div/div/div[@class='ant-row']/following-sibling::a)[1]");
    }

    open() {
        return super.open('./publications');
    }
}

module.exports = new PublicationsPage();