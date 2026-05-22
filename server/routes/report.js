const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");
const { getSalesReport } = require("../controllers/reportController");

router.get("/sales", auth, adminOnly, getSalesReport);

module.exports = router;