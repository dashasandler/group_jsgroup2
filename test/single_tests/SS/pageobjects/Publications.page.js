const Page = require('./Page');

class PublicationsPage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    get hamburgerMenu() {
        return $('button#nav-bar-toggle');
    }

    get peopleMenuItem() {
        return $('#people');
    }

    get companiesMenuItem() {
        return $('#companies');
    }

    get publicationsMenuItem() {
        return $('#publications');
    }

    get problemsMenuItem() {
        return $('#problems');
    }

    get addPublication() {
        return $('a>button');
    }

    get publicationTitle() {
        return $('div.pb-4>div:nth-child(2)>div>a')
    }

    get logoutMenuItem() {
        return $('//div[@id="logout"]')
    }

    get likesNumber() {
        return $('(//span[@class="ml-1"])[1]')
    }

    open() {
        return super.open('./publications');
    }
}

module.exports = new PublicationsPage();