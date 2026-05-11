const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");

router.post("/login", login);

module.exports = router;