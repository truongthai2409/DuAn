const axios = require('axios');
const crypto = require('crypto');

const appKey = '129821';
const appSecret = 'Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO';
const accessToken = 'access_token';

// Tạo URL và ký hiệu cho request
const url = 'https://api.lazada.vn/rest/product/create';
const payload = {
  attributes: {
    name: 'Sample Product',
    short_description: 'This is a sample product',
    description: 'Full description of the sample product',
    brand: 'Sample Brand',
    model: 'Model123',
    warranty_type: 'No Warranty'
  },
  skus: [
    {
      SellerSku: 'sample_sku_1',
      price: '100.00',
      quantity: '10'
    }
  ]
};

const sign = (appKey, appSecret, accessToken, payload) => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/-|:/g, '') + '+0000';
  const signString = `${appKey}app_key${appKey}payload${JSON.stringify(payload)}timestamp${timestamp}access_token${accessToken}`;
  return crypto.createHmac('sha256', appSecret).update(signString).digest('hex').toUpperCase();
};

const signedUrl = `${url}?app_key=${appKey}&timestamp=${new Date().toISOString().slice(0, 19).replace(/-|:/g, '')}+0000&sign=${sign(appKey, appSecret, accessToken, payload)}`;

// Gửi yêu cầu HTTP với axios
axios.post(signedUrl, payload, {
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});