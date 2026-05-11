const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");
const { getAll, create, update, remove } = require("../controllers/categoryController");

router.get("/", auth, getAll);
router.post("/", auth, adminOnly, create);
router.put("/:id", auth, adminOnly, update);
router.delete("/:id", auth, adminOnly, remove);

module.exports = router;