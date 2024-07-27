const express = require("express");

const { generateAccessTokenLazada } = require("../controllers/lazada.controllers");

const lazadaRouters = express.Router();


lazadaRouters.post("/generate-access-token", generateAccessTokenLazada);

module.exports = lazadaRouters;