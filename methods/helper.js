const {registerUser, registerActivation, userLogin, deletePublication, Problems} = require("./axios.methods");


async function clearInputValue(element) {
    while (await element.getValue() !== '') {
        await element.doubleClick();
        element.keys("Delete");
    }
}

async function createAndLoginAPI(email, password) {
    const userCreateRes = await registerUser(email, password)
    if (userCreateRes.errors) console.log(userCreateRes.errors)

    const userActivateRes = await registerActivation(userCreateRes.activationLinkId)
    if (userActivateRes.errors) console.log(userActivateRes.errors)

    const userLoginRes = await userLogin(email, password)
    if (userLoginRes.errors) console.log(userLoginRes.errors)

    return userLoginRes.accessToken;
}

async function getAdminToken() {
    const userLoginRes = await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    if (userLoginRes.errors) {
        console.log(userLoginRes.errors);
    }
    return userLoginRes.accessToken;

}
async function deletePublicationFunction(pubID, admToken){
    const result = await deletePublication({pubID, admToken});
    if (result.errors) {
        console.error('publication Not found!!! \nTest: API - publication delete test - failed!!!!')
    }
    return result;
}

async function getProblemId(title, userId){
    //const result = await
    //need to change!
}

module.exports = {
    clearInputValue,
    createAndLoginAPI,
    getAdminToken,
    deletePublicationFunction
}