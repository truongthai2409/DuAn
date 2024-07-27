const aLazadaAPI = require("../config/lazada.config.js")
const AccessToken = require("../models/AccessToken.js")

exports.generateAccessTokenLazada = async (req, res) => {
    try {
        const { codeLoginLazada } = req.body
        await aLazadaAPI
        .generateAccessToken({ code: codeLoginLazada })
        .then(response => {
            const { access_token } = response // JSON data from Lazada's API
            const newAccessToken = new AccessToken({
                accesstoken: access_token
            });
            const savedAccessToken = newAccessToken.save();
            res.status(200).json({
                status: "success",
                code: 200,
                data: [savedAccessToken],
                message: "generate access token success"
            })
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
    res.end()
}

// exports.deleteAccessToken = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({
//             status: "error",
//             code: 500,
//             message: error
//         })
//     }
//     res.end()
// }