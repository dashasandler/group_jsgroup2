const axios = require('axios');
const API_URL = 'https://enduring-server.herokuapp.com/v3/graphql';

async function registerUser(email, password) {

    const queryData = JSON.stringify({
        query: `mutation userCreate ($email: String!, $password: String!) {
                    userCreate (email: $email, password: $password)
                }`,
        variables: {"email": email, "password": password}
    });

    const { data } = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(data.errors){
        return { errors: data.errors }
    } else {
        const activationLink = data.data.userCreate;
        return { activationLink };
    }
}

async function registerActivation(activationLinkId) {
    const queryData = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
        userActivate (activationLinkId: $activationLinkId)
}`,
        variables: { "activationLinkId":activationLinkId }
    });

    const { data } = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(data.errors){
        return { errors: data.errors }
    } else {
        const activationString = data.data.userActivate;
        return { activationString };
    }
}
module.exports = {
    registerUser,
    registerActivation
}