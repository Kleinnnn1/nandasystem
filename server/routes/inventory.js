const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");
const { getAll, restock } = require("../controllers/inventoryController");

router.get("/", auth, getAll);
router.patch("/:id/restock", auth, adminOnly, restock);

module.exports = router;