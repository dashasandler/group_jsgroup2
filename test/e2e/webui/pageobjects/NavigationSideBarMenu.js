module.exports = class NavigationSideBar {
    get pageTitle() { return $('div>h6'); }
    get hamburgerMenuBtn() { return $("button#nav-bar-toggle"); }
    get publicationsMenuItem() { return $('#publications'); }
    get peopleMenuItem() { return $("#people"); }
    get companiesMenuItem() { return $('#companies'); }
    get problemsMenuItem() { return $('#problems'); }
    get profileMenuItem() { return $("#profile"); }
    get logoutBtn() { return $("#logout"); }

    async openPublications() {
        await this.hamburgerMenuBtn.click();
        await this.publicationsMenuItem.click();
    }

    async openPeople() {
        await this.hamburgerMenuBtn.click();
        await this.peopleMenuItem.click();
    }

    async openCompanies() {
        await this.hamburgerMenuBtn.click();
        await this.companiesMenuItem.click();
    }

    async openProblems() {
        await this.hamburgerMenuBtn.click();
        await this.problemsMenuItem.click();
    }

    async openProfile() {
        await this.hamburgerMenuBtn.click();
        await this.profileMenuItem.click();
    }
    async logout() {
        await this.hamburgerMenuBtn.click();
        await this.logoutBtn.click();
    }

}