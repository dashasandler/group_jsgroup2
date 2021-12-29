const Page = require('./Page');

class TestPublication extends Page {
	get titleInputField() {
		return $("//input[@id='title']");
	}
	get imageInputField() {
		return $('//input[@id="image"]');
	}
	get descriptionInputField() {
		return $('//input[@id="description"]');
	}
	get imageInputField() {
		return $('//input[@id="image"]');
	}
	get saveButton() {
		return $('button[type="submit"]');
	}

	get cancelButton() {
		return $('button.mr-3');
	}

	open()
	{
		return super.open('/publications');
	}
}

module.exports = new PublicationPage();
