
const LazadaAPI = require('lazada-open-platform-sdk')

const appKey = "129821"
const appSecret = "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO"

const aLazadaAPI = new LazadaAPI(appKey, appSecret, 'VIETNAM')

const accessToken = '500001000222qYcwUwBeUNiRFljqZMqfgy1dbd4a05kTcIRZTpc6GDx9r4XfgAio'

// aLazadaAPI
//   .generateAccessToken({ code: '0_129821_YxvacJ2Wfv6xFArOBDyxfQL082140' })
//   .then(response => {
//     const { access_token } = response // JSON data from Lazada's API
//     // accessToken = access_token
//     console.log(access_token);
// })
const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, 'VIETNAM', accessToken)

module.exports = aLazadaAPIWithToken;

// aLazadaAPIWithToken
//   .getProducts({filter: 'all'})
//   .then(response => {
//     console.log(response);
//     console.log(response.data.products);
//     console.log(response.data.products[0].skus);
// })
