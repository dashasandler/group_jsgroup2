const Page = require('./Page');

class PublicationViewPage extends Page {
    // Navigation
    get linkBack() {
        return $('//a[@href="/"]');

    }
    get buttonEdit() {
        return $('div.ant-row-space-between>button');
        //return $('div.ant-row>button[type="button"]');
    }

    get textPublicationOwner(){
        return $('//a[contains(@href,"user")]/div[contains(@class,"linked-text")]');
    }

    get textPublicationDate(){
        return $('//div[contains(@class,"mb-3")]//div[@class="ant-col"]/div');
    }

    get publicationTitle(){
        return $('div.p-3>h2')
    }

    get textPublicationDescription(){
        return $('div.p-3>div:nth-of-type(2)')
    }

    open() {
        return super.open('./publication');
    }
}

module.exports = new PublicationViewPage();