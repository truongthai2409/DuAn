const LazadaAPI = require('lazada-open-platform-sdk')

const appKey = "129821"
const appSecret = "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO"

const aLazadaAPI = new LazadaAPI(appKey, appSecret, 'VIETNAM')

const accessToken = 'some_access_token'
const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, 'VIETNAM', accessToken)

aLazadaAPIWithToken
  .getProducts()
  .then(response => {
    console.log(response);
})