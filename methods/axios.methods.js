const axios = require('axios');
const API_URL = process.env.API_URL;

/**'https://enduring-server.herokuapp.com/v3/graphql'*/

/** User - Register */

async function registerUser(email, password) {

    const queryData = JSON.stringify({
        query: `mutation userCreate ($email: String!, $password: String!) {
                    userCreate (email: $email, password: $password)
                }`,
        variables: {"email": email, "password": password}
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (data.errors) {
        return {errors: data.errors}
    } else {
        const activationLinkId = data.data.userCreate;
        return {activationLinkId};
    }
}

/** New User - Activation */

async function registerActivation(activationLinkId) {
    const queryData = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
        userActivate (activationLinkId: $activationLinkId)
}`,
        variables: {activationLinkId}
    });
    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (data.errors) {
        return {errors: data.errors}
    } else {
        const activationString = data.data.userActivate;
        return {activationString};
    }
}

/** User Login*/

async function userLogin(email, password) {
    const queryData = JSON.stringify({
        query: `query login ($email: String!, $password: String!) {
      login (email: $email, password: $password) {
        accessToken
        user {
                _id
                roles
        }
      }
    }`,
        variables: {"email": email, "password": password}
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (data.errors) {
        return {errors: data.errors}
    } else {
        const accessToken = data.data.login.accessToken;
        const userID = data.data.login.user.roles !== 'admin' ? data.data.login.user._id : 'Can not delete this account(admin)!';
        return {accessToken, userID};
    }
}

/** Publication - Create */
async function createPublication(
    {
        title = "title: Max length is 255 characters",
        image = "image: Max length is 255 characters - missing link",
        description = "description: Max length is 255 characters",
        content = "lost content =)",
        accessToken
    }) {
    const queryData = JSON.stringify({
        query: `mutation PublicationCreate($values: PublicationInput) {
  publicationCreate(values: $values) {
    _id
    title
    description
    content
    image
    owner {
      _id
      firstName
      lastName
      image
      __typename
    }
    createdAt
    updatedAt
  }
}`,
        variables: {
            values:
                {
                    title,
                    image,
                    description,
                    content,
                }
        }
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.publicationCreate._id;
    }
}

/** User - Delete */

async function deleteUser({userID, admToken}) {
    const queryData = JSON.stringify({
        query: `mutation userDelete($userId: ID!) {
  userDelete(userId: $userId)
}`,
        variables: {
            userId: userID
        }
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        headers: {
            'Authorization': `Bearer ${admToken}`,
            'Content-Type': 'application/json'
        },
        data: queryData
    });

    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.userDelete;

    }
}

async function deletePublication({pubID, admToken}) {
    const queryData = JSON.stringify({
        query: `mutation publicationDelete($pubId: ID!) {
  publicationDelete(pubId: $pubId)
}`,
        variables: {
            pubId: pubID
        }
    });
    console.log("======="+queryData, pubID);
    const {data} = await axios({
        method: 'post',
        url: API_URL,
        headers: {
            'Authorization': `Bearer ${admToken}`,
            'Content-Type': 'application/json'
        },
        data: queryData
    });

    console.log("======="+data);
    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.publicationDelete;

    }
}

// {
//     "data": {
//     "publicationDelete": "Publication deleted"
// }
// }

// {
//     "errors": [
//     {
//         "message": "ValidationError: No Publication found by provided ID",
//         "locations": [
//             {
//                 "line": 2,
//                 "column": 3
//             }
//         ],
//         "path": [
//             "publicationDelete"
//         ],
//         "extensions": {
//             "code": "BAD_USER_INPUT",
//             "exception": {
//                 "stacktrace": [
//                     "UserInputError: ValidationError: No Publication found by provided ID",
//                     "    at Object.publicationDelete (/app/build/graphql/Publication/mutations/publicationDelete.js:34:11)",
//                     "    at runMicrotasks (<anonymous>)",
//                     "    at processTicksAndRejections (internal/process/task_queues.js:93:5)"
//                 ]
//             }
//         }
//     }
// ],
//     "data": {
//     "publicationDelete": null
// }
// }

module.exports = {
    registerUser,
    registerActivation,
    userLogin,
    createPublication,
    deleteUser,
    deletePublication,
}
