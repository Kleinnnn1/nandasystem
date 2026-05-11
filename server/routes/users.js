const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");
const { getAll, create, update, changePassword, toggleActive } = require("../controllers/userController");

router.get("/", auth, adminOnly, getAll);
router.post("/", auth, adminOnly, create);
router.put("/:id", auth, adminOnly, update);
router.patch("/:id/password", auth, adminOnly, changePassword);
router.patch("/:id/toggle", auth, adminOnly, toggleActive);

module.exports = router;