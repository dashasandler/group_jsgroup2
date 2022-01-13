const axios = require('axios');
const API_URL = 'https://enduring-server.herokuapp.com/v3/graphql';


const requestData = JSON.stringify({
  query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}`,
  variables: {"email":`Warred.arroll${Date.now()}@yahoo.com`,"password":"2!itz9PrUI6sPE5J"}
});

  async function registerUser(){
      const userRegist = await axios({
      method: 'post',
      url: API_URL,
      data: requestData,
      headers: {
        // 'Authorization': 'Bearer ${token}',
         'Content-Type': 'application/json'
      }
    })
   console.log({
       data: userRegist.data,
     
   }, userRegist.config.data);

  }
  registerUser(); 