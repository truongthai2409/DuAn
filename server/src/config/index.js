const dotenv = require("dotenv");
dotenv.config();

const { URI, PORT, 
    SECRET_ACCESS_TOKEN, 
    HOST_NGROK,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN } = process.env;

module.exports = {
    URI, PORT, 
    SECRET_ACCESS_TOKEN, 
    HOST_NGROK, 
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN
};