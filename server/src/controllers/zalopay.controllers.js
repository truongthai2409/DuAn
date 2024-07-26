const moment = require("moment/moment");
const CryptoJS = require('crypto-js');
const zaloPayConfig = require("../config/zalopay.config");
const { default: axios } = require("axios");
const { HOST_NGROK } = require("../config");

exports.zaloPayController = async (req, res) => {
    const embed_data = { redirecturl: "https://pcrender.com" } //chuyen den khi thanh toan thanh cong
    const items = [{}]; // gio hang
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: zaloPayConfig.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "",
        callback_url: `${HOST_NGROK}/payment/callback`
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = zaloPayConfig.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

    try {
        const result = await axios.post(zaloPayConfig.endpoint, null, { params: order });
        // console.log(result.data)
        res.status(200).json(result.data);
    } catch (error) {
        console.log("payment error");
        console.log(error.message)
        res.status(404).json(error.message);
    }
}

exports.paymentSuccessController = async (req, res) => {
    let result = {};

    try {
        let dataStr = req.body.data; // zalopay gui lai
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, zaloPayConfig.key2).toString();
        console.log("mac =", mac);

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.returncode = -1;
            result.returnmessage = "mac not equal";
        }
        else {
            // xu ly user o day
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            // let dataJson = JSON.parse(dataStr, zaloPayConfig.key2);
            console.log("pament success");
            // console.log("update order's status = success where apptransid =", dataJson["apptransid"]);

            result.returncode = 1;
            result.returnmessage = "success";
        }
    } catch (ex) {
        result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.returnmessage = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
}


