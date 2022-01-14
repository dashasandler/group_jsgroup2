const axios = require('axios');
const API_URL = process.env.API_URL;

/**
 * Axios methods for GraphQL requests
 * API link: 'https://enduring-server.herokuapp.com/v3/graphql'
 * QA4EVERYONE_03 - JSGroup2
 * */


/** New User - Register */

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

/** Publication - publication */
async function getPublication(pubID,accessToken) {
    const queryData = JSON.stringify({
        query: `query publication ($pubId: ID!) {
      publication (pubId: $pubId) {
        _id
        title
        description
        content
        image
        owner{
            _id
            email
            firstName
            lastName
            }
        likes {
            _id
            email
            firstName
            lastName
            }
        createdAt
        updatedAt
      }
    }`,
        variables: {"pubId": pubID}
    });
    console.log("++++>"+queryData)
    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    console.log("===>:",data)
    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.publication;
    }
}

/** Publication - publications */
async function getPublicationsList(accessToken) {
    const queryData = JSON.stringify({
        query: `query publications ($offset: Int, $limit: Int) {
    publications (offset: $offset, limit: $limit) {
        _id
        title
        description
        content
        image
        owner{
            _id
            email
            firstName
            lastName
            }
        likes {
            _id
            email
            firstName
            lastName
            }
        createdAt
        updatedAt
      }
    }`,
        variables: {"offset":0,"limit":0}
    });
    console.log("++++>"+queryData)
    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    console.log("===>:",data)
    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.publications;
    }
}


/** Problem - Create */

async function createProblem(
    {
        title,
        company,
        jobTitle,
        content,
        accessToken
    }) {
    const queryData = JSON.stringify({
        query: `mutation ProblemCreate($data: ProblemInput) {  problemCreate(data: $data) {
                _id
                title
                }
            }`,
        variables: {
            data:
                {
                    title,
                    company,
                    jobTitle,
                    content
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
    });
    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.problemCreate._id;
    }
}

/** Problems */
async function getProblemsList (accessToken) {
    const queryData = JSON.stringify({
        query: `query{
 problems(offset:0
limit:10000) {
  _id
  title
  content
  company{
    _id
    description
  }
  jobTitle
}
}`
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
        return data.data.problems;
    }
}

/** Problem */
async function getProblem (
    {problemId, accessToken}
) {
    const queryData = JSON.stringify({
        query: `query problem ($problemId: ID!) {
            problem (problemId: $problemId)
        {
          _id
          title
          content
          company{title  _id}
          owner{
            email
          }
        }
        }`,
        variables: {"problemId":problemId}
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
        return data.data.problem;
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

/** Publication - Delete */

async function deletePublication({pubID, admToken}) {
    const queryData = JSON.stringify({
        query: `mutation publicationDelete($pubId: ID!) {
  publicationDelete(pubId: $pubId)
}`,
        variables: {
            pubId: pubID
        }
    });
    console.log("pub delete query=>",queryData)
    const {data} = await axios({
        method: 'post',
        url: API_URL,
        headers: {
            'Authorization': `Bearer ${admToken}`,
            'Content-Type': 'application/json'
        },
        data: queryData
    });
    console.log("pub delete=>",data)
    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.publicationDelete;

    }
}

async function deleteProblem({problemID, admToken}) {
    const queryData = JSON.stringify({
        query: `mutation problemDelete ($problemId: ID!) {
        problemDelete(problemId: $problemId)
        }`,
        variables: {
            problemId: problemID
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
        return data.data.problemDelete;

    }
}




module.exports = {
    registerUser,
    registerActivation,
    userLogin,
    createPublication,
    getPublication,
    createProblem,
    getProblem,
    deleteUser,
    deletePublication,
    deleteProblem,
    getProblemsList,
}
