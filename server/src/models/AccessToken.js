const mongoose = require("mongoose");
const AccessTokenSchema = new mongoose.Schema(
    {
        accesstoken: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("accessToken", AccessTokenSchema);