const Page = require('./Page')
const {string} = require("fast-glob/out/utils");

class LoginPage extends Page {

	get labelLogin() {
		return $('h3')
	}

	get inputEmailLabel() {
		return $('#email-label');
	}

	get inputEmail() {
		return $('#email');
	}

	get labelPassword() {
		return $('#password-label');
	}

	get labelPasswordRequired() {
		return $(
			'label#email-label>span.MuiInputLabel-asterisk');
	}

	get inputPassword() {
		return $('#password');
	}

	get btnSubmit() {
		return $('button[type="submit"]');
	}

	get labelPasswordReset() {
		return $('//div[@class="ant-row ant-row-center mt-3"]')
	}

	get linkPasswordReset() {
		return $('a[href="/passwordReset"]')
	}

	get labelSignup() {
		return $('//div[@class="ant-row ant-row-center"]')
	}

	get linkSignup() {
		return $('//div[@class="ant-row ant-row-center"]')
	}

	async login(username, password) {
		await this.open();
		await this.inputEmail.setValue(username);
		await this.inputPassword.setValue(password);
		await this.btnSubmit.click();
	}

	open() {
		return super.open('login');
	}
}

module.exports = new LoginPage();
