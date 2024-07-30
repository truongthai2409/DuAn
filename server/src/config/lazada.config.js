
const LazadaAPI = require('lazada-open-platform-sdk')
const AccessToken = require('../models/AccessToken')

const appKey = "129821"
const appSecret = "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO"

const aLazadaAPI = new LazadaAPI(appKey, appSecret, 'VIETNAM')



// aLazadaAPI
//   .generateAccessToken({ code: '0_129821_YxvacJ2Wfv6xFArOBDyxfQL082140' })
//   .then(response => {
//     const { access_token } = response // JSON data from Lazada's API
//     accessToken = access_token
//     // console.log(access_token);
// })

// const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, 'VIETNAM', accessToken.accesstoken)

module.exports = aLazadaAPI;

// aLazadaAPIWithToken
//   .getProducts({filter: 'all'})
//   .then(response => {
//     console.log(response);
//     console.log(response.data.products);
//     console.log(response.data.products[0].skus);
// })
