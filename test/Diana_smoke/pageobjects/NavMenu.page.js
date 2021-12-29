const Page = require('./Page');

class NavigationMenu extends Page {
    // get pageTitle() {
    //     return $('div>h6');
    // }
    get navMenu() {
        return $('#nav-bar-toggle');
    }

    get publicationsMenuItem() {
        return $('#publications');
    }

    get peopleMenuItem() {
        return $('#people');
    }

    get companiesMenuItem() {
        return $('#companies');
    }

    get problemsMenuItem() {
        return $('#problems');
    }

    get profileMenuItem() {
        return $('#profile');
    }

    get logoutMenuItem() {
        return $('#logout');
    }

    async openPublications() {
        await this.navMenu.click();
        await this.publicationsMenuItem.click();
    }

    async openPeople() {
        await this.navMenu.click();
        await this.peopleMenuItem.click();
    }

    async openCompanies() {
        await this.navMenu.click();
        await this.companiesMenuItem.click();
    }

    async openProblems() {
        await this.navMenu.click();
        await this.problemsMenuItem.click();
    }

    async openProfile() {
        await this.navMenu.click();
        await this.profileMenuItem.click();
    }

    async logout() {
        await this.navMenu.click();
        await this.logoutMenuItem.click();
    }
}

module.exports = new NavigationMenu();