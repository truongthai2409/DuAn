const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Thư mục để lưu trữ tệp tải lên
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên tệp tải lên
    }
});

exports.upload = multer({ storage: storage });