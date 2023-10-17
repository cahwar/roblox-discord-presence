const express = require("express");
const { checkUserInServer } = require("../controllers/discordController.js");

const router = express.Router();

router.get("/", checkUserInServer);

module.exports = router;