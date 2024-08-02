const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = require('../config');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    CLIENT_ID, 
    CLIENT_SECRET,
    REDIRECT_URI 
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

async function getAccessToken() {
    try {
        const accessTokenResponse = await oauth2Client.getAccessToken();
        return accessTokenResponse.token;
    } catch (error) {
        console.error('Failed to get access token', error);
        throw new Error('Failed to get access token');
    }
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'truongthongthethai@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: getAccessToken()
    }
});

exports.sendEmailController = async (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: '"Auto Extension 👻"truongthongthethai@gmail.com',
        to: email, 
        subject: subject, 
        text: message ,
        // html: "<b>Hello world?</b>"
    };

    try {
        const accessToken = await getAccessToken();
        transporter.set('auth', { accessToken });

        await transporter.sendMail(mailOptions);
        res.status(200).send('Email đã được gửi thành công.');
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).send('Có lỗi xảy ra khi gửi email.');
    }
};
