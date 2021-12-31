const {registerUser, registerActivation} = require("../../../../methods/api.methods");
const Creds = require('../../../../test_data/credentials')
const chai = require('chai')

describe('SIGN UP PAGE', () => {

    let result = null;

    it('API - registration', async () => {
        result = await registerUser(Creds.newUser.email, Creds.newUser.password)
        console.log(result)
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("already exist");
            console.error('user not created, already exist!!! \nTest: API - registration test - failed!!!!')
        } else {
            expect(!!result.activationLink).toBe(true);
        }
    });

    it('API - user activation', async () => {
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("already exist");
            console.error("Test: API - user activation test -  failed!!!!!");
        } else {
            result = await registerActivation(result.activationLink)
            expect(result.activationString).toHaveText("Activation Successful!")
        }
    });

});