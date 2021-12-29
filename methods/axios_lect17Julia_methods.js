const axios = require('axios');
const API_URL = 'https://enduring-server.herokuapp.com/v3/graphql';

const requestData = JSON.stringify({
	query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}b`,
	variables: {"email":"dia1@gmail.com","password":"YHqicDMYn6zPxkf"}
});


async function registerUser(){
  const userRegist = await axios({
      method: 'post',
      url: 'https://enduring-server.herokuapp.com/v3/graphql',
      data: requestData,
      headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
//    console.log(userRegist);
//     console.log({
//         data: userRegist.data,
//         errors: userRegist.data.errors
//     })
}

registerUser();

// const config = {
//     method: 'post',
//     url: 'https://enduring-server.herokuapp.com/v3/graphql',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data : requestData
// };
//
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

//


// second for debug
// use line 5 - 10 +



// //add query to the request
//
// async function registerUser(email, password) {
//
// 	const queryData = JSON.stringify({
// 		query: `mutation userCreate ($email: String!, $password: String!) {
//                     userCreate (email: $email, password: $password)
//                 }`,
// 		// variables: {"email": "S9843334535587sjde@gmail.com", "password":"1N7mMno3oqmX3Z#"}
// 		variables: {"email": email, "password": password}
// 	});
//
// 	const { data } = await axios({
// 		method: 'post',
// 		url: API_URL,
// 		data: queryData,
// 		headers: {
// 			'Content-Type': 'application/json',
// 		}
// 	})
//
//     //to check data inside
//
//     console.log(data);
//     // console.log(data.errors);
//     // console.log(data.errors[0].message);
//     // console.log(data.errors[0]);
//
//
//     // console.log({
//     //     data: data,
//     //     errors: data.errors,
//     //     activationLink: data.data ? data.data.userCreate : null, //data.data && data.data.userCreate
//     // })
//
// 	if(data.errors){
// 		return { errors: data.errors }
// 	} else {
// 		const activationLink = data.data.userCreate;
// 		return { activationLink };
// 	}
// }

//
// registerUser() //to run the function on the page

//
//
// async function registerActivation(activationLinkId) {
// 	const queryData = JSON.stringify({
// 		query: `mutation userActivate ($activationLinkId: String!) {
//         userActivate (activationLinkId: $activationLinkId)
// }`,
// 		variables: { activationLinkId }
// 	});
//
// 	const { data } = await axios({
// 		method: 'post',
// 		url: API_URL,
// 		data: queryData,
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})

	// console.log({
	//     activationString: activationString,
	//     data: data.data,
	//     errors: data.errors
	// })

// 	if(data.errors){
// 		return { errors: data.errors }
// 	} else {
// 		const activationString = data.data.userActivate;
// 		return { activationString: activationString };
// 	}
// }
// registerActivation();

//
// module.exports = {
// 	registerUser,
// 	registerActivation
// }
