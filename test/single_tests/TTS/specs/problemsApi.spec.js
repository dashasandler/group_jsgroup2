const { userLogin, getProblemsList,createProblem } = require("../../../../methods/axios.methods");
const chai = require('chai')
const LoginPage = require("../pageobjects/Login.page");
const problemDetails= require("../test_data/testdata")

describe(' Login and Get Problems list', () => {

    let result = null;

    before('Login user', async () => {
            result = await userLogin(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
            accessId = result.accessToken
    });

    it('API - get problems list', async () => {
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Error: User with provided email does not exist");
            console.error('Login failed,\nuser with provided email does not exist!!!')
        } else {
            result= await createProblem(333  )
        result= await getProblemsList(accessId);
            console.log(result+ "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            await expect(result.length).toBeGreaterThan(0)
           // await expect(result.)
    }
    });

});