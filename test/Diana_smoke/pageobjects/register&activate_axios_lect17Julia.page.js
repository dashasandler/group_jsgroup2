const { registerUser, registerActivation } = require("../../methods/axios.methods"); //import method here

describe('LOGIN PAGE', () => {

	let result = null;


	it('API - registration', async () => {
		result = await registerUser("Sai34567gw3345ww@gmail.com", "1N7mMno3oqmX3Z$")
		console.log(result)
		expect(!!result.activationLink).toBe(true);
	});

	it('API - user activation', async () => {
		result = await registerActivation(result.activationLink)
		console.log(result)
		expect(result.activationString).toHaveText("Activation Successful!")
	});

});