const Page = require('./Page');

class ProfilePage extends Page {
    get pageTitle() {
        return $('div>h6');
    }

    open() {
        return super.open('./user');
    }
}

module.exports = new ProfilePage();